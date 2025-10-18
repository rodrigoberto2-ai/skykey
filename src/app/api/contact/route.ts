import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { nombre, email, telefono, asunto, mensaje, consent } = data || {};

    if (!nombre || !email || !asunto || !mensaje || !("consent" in data)) {
      return NextResponse.json({ ok: false, error: "Campos obligatorios faltantes" }, { status: 400 });
    }

    // Mock: log no servidor. Substitua por envio de email/Nodemailer.
    console.log("CONTACT_FORM", { nombre, email, telefono, asunto, mensaje, consent });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Solicitud inválida" }, { status: 400 });
  }
}

