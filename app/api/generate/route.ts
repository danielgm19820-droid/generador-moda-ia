import OpenAI, { toFile } from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const image = formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        { error: "Debes subir una imagen de la prenda." },
        { status: 400 }
      );
    }

    const genero = String(formData.get("genero") || "Femenino");
    const edadAprox = String(formData.get("edadAprox") || "18 a 29 años");
    const tipoCuerpo = String(formData.get("tipoCuerpo") || "Delgado");
    const colorCabello = String(formData.get("colorCabello") || "Castaño");
    const tonoPiel = String(formData.get("tonoPiel") || "Morena");
    const fondo = String(formData.get("fondo") || "Estudio");
    const iluminacion = String(formData.get("iluminacion") || "Luz de estudio");
    const pose = String(formData.get("pose") || "Natural");
    const angulo = String(formData.get("angulo") || "Frente");
    const encuadre = String(formData.get("encuadre") || "Cuerpo completo");
    const proporcion = String(formData.get("proporcion") || "Story (9:16)");
    const detalles = String(formData.get("detalles") || "");

    const prompt = `
Crea una fotografía profesional de moda ecommerce.

Usa la imagen subida como referencia principal de la prenda.
Haz que la modelo vista esa misma prenda.

Conserva con alta fidelidad:
- color
- diseño
- estampados
- mangas
- cuello
- forma y corte de la prenda
- detalles visibles

No inventes logotipos, textos ni diseños que no existan en la prenda.

Modelo:
- Género: ${genero}
- Edad: ${edadAprox}
- Tipo de cuerpo: ${tipoCuerpo}
- Cabello: ${colorCabello}
- Tono de piel: ${tonoPiel}

Escenario:
- Fondo: ${fondo}
- Iluminación: ${iluminacion}

Cámara:
- Pose: ${pose}
- Ángulo: ${angulo}
- Encuadre: ${encuadre}

Detalles adicionales:
${detalles || "Sin detalles adicionales."}

Resultado fotorrealista, anatomía natural, acabado comercial premium,
fotografía limpia de catálogo y ecommerce.
`;

    const uploadedImage = await toFile(
      Buffer.from(await image.arrayBuffer()),
      image.name || "prenda.png",
      {
        type: image.type || "image/png",
      }
    );

    const size =
      proporcion.includes("16:9")
        ? "1536x1024"
        : "1024x1536";

    const result = await openai.images.edit({
      model: "gpt-image-2",
      image: uploadedImage,
      prompt,
      size,
      quality: "medium",
    });

    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "No se recibió una imagen generada." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: `data:image/png;base64,${imageBase64}`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudo generar la imagen. Revisa tu API y tus créditos.",
      },
      { status: 500 }
    );
  }
}
