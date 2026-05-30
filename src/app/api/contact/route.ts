import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      tattooStyle,
      placement,
      size,
      description,
      referenceImages,
      budget,
      availability,
    } = body;

    // Vérifier que la clé API est configurée
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 }
      );
    }

    // Initialiser Resend avec la clé API
    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailPayload: Parameters<typeof resend.emails.send>[0] = {
      from: "Tattoo Website <onboarding@resend.dev>", // Domaine gratuit de Resend
      to: ["mathieu.perron95@outlook.com"], // Email vérifié sur Resend
      subject: `🎨 Nouvelle demande de tatouage - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #f5f5f5; padding: 20px; border-radius: 10px;">
          <h1 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
            Nouvelle demande de tatouage
          </h1>
          
          <h2 style="color: #d4af37; margin-top: 20px;">📋 Informations du client</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Nom</td>
              <td style="padding: 8px; border-bottom: 1px solid #333;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Email</td>
              <td style="padding: 8px; border-bottom: 1px solid #333;">
                <a href="mailto:${email}" style="color: #d4af37;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Téléphone</td>
              <td style="padding: 8px; border-bottom: 1px solid #333;">${phone || "Non fourni"}</td>
            </tr>
          </table>
          
          <h2 style="color: #d4af37; margin-top: 20px;">🎨 Détails du projet</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Style</td>
              <td style="padding: 8px; border-bottom: 1px solid #333;">${tattooStyle}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Emplacement</td>
              <td style="padding: 8px; border-bottom: 1px solid #333;">${placement}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Taille</td>
              <td style="padding: 8px; border-bottom: 1px solid #333;">${size}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Budget</td>
              <td style="padding: 8px; border-bottom: 1px solid #333;">${budget || "Non spécifié"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Disponibilités</td>
              <td style="padding: 8px; border-bottom: 1px solid #333;">${availability || "Non spécifié"}</td>
            </tr>
          </table>
          
          <h2 style="color: #d4af37; margin-top: 20px;">📝 Description du projet</h2>
          <div style="background-color: #141414; padding: 15px; border-radius: 8px; margin-top: 10px;">
            ${description || "Aucune description fournie"}
          </div>
          
          ${referenceImages ? `
            <h2 style="color: #d4af37; margin-top: 20px;">🖼️ Images de référence</h2>
            <div style="background-color: #141414; padding: 15px; border-radius: 8px; margin-top: 10px;">
              ${referenceImages}
            </div>
          ` : ""}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; text-align: center; color: #888;">
            <p>Ce message a été envoyé depuis le formulaire de contact de votre site web.</p>
            <p style="color: #d4af37;">Répondre directement à cet email pour contacter le client.</p>
          </div>
        </div>
      `,
    };

    if (email) {
      emailPayload.replyTo = email;
    }

    // Envoyer l'email
    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
