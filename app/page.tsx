"use client";

import { useMemo, useState } from "react";

type FormDataType = {
  uploadedImage: string | null;
  rangoEdad: string;
  edadAprox: string;
  genero: string;
  tipoCuerpo: string;
  colorCabello: string;
  tonoPiel: string;
  fondo: string;
  iluminacion: string;
  pose: string;
  angulo: string;
  encuadre: string;
  proporcion: string;
  detalles: string;
};

const initialData: FormDataType = {
  uploadedImage: null,
  rangoEdad: "Adulto",
  edadAprox: "18 a 29 años",
  genero: "Femenino",
  tipoCuerpo: "Delgado",
  colorCabello: "Castaño",
  tonoPiel: "Morena",
  fondo: "Estudio",
  iluminacion: "Luz de estudio",
  pose: "Natural",
  angulo: "Frente",
  encuadre: "Cuerpo completo",
  proporcion: "Story (9:16)",
  detalles: "",
};

function OptionButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`option-btn ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default function Page() {
  const [step, setStep] = useState(1);
  const [view, setView] = useState<"wizard" | "result" | "video">("wizard");
  const [data, setData] = useState<FormDataType>(initialData);

  const progress = useMemo(() => (step / 5) * 100, [step]);

  const updateField = (field: keyof FormDataType, value: string | null) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    updateField("uploadedImage", preview);
  };

  const resetAll = () => {
    setStep(1);
    setView("wizard");
    setData(initialData);
  };

  if (view === "result") {
    return (
      <main className="page-wrap">
        <div className="top-icons">
          <div className="icon-pill active">👕</div>
          <div className="icon-pill">✏️</div>
          <div className="icon-pill">🎥</div>
          <div className="icon-pill">👥</div>
        </div>

        <div className="result-layout">
          <div className="result-card">
            <div className="preview-box large">
              {data.uploadedImage ? (
                <img src={data.uploadedImage} alt="Prenda subida" className="preview-img" />
              ) : (
                <div className="empty-state">Resultado de imagen</div>
              )}
            </div>

            <div className="action-grid">
              <button className="secondary-btn">⬇ Descargar imagen</button>
              <button className="secondary-btn" onClick={() => setView("video")}>
                🎥 Generar video
              </button>
              <button className="secondary-btn">🙂 Crear modelo de referencia</button>
              <button className="secondary-btn">📁 Guardar escenario</button>
              <button className="secondary-btn">✏️ Editar imagen</button>
              <button className="secondary-btn" onClick={resetAll}>
                ↩ Volver al inicio
              </button>
            </div>

            <button className="primary-btn full-btn" onClick={resetAll}>
              Subir otra prenda
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (view === "video") {
    return (
      <main className="video-page">
        <h1 className="video-title">Generador de video</h1>
        <div className="video-grid">
          <div className="video-preview-card">
            <div className="preview-box video-preview">
              {data.uploadedImage ? (
                <img src={data.uploadedImage} alt="Preview" className="preview-img" />
              ) : (
                <div className="empty-state">Vista previa</div>
              )}
            </div>
          </div>

          <div className="video-options-card">
            <div className="video-tabs">
              <button className="tab-btn active">Modo estándar</button>
              <button className="tab-btn">🎥 Video Pro</button>
            </div>

            <h2 className="video-subtitle">Elige un estilo de video</h2>
            <div className="video-style-grid">
              {[
                ["Girar", "La modelo gira lentamente para mostrar el look."],
                ["Demostrar", "Movimiento lateral y gesto natural."],
                ["Desfilar", "La modelo camina hacia la cámara."],
                ["Pose", "Movimientos suaves y mirada natural."],
              ].map(([title, desc]) => (
                <button className="video-style-btn" key={title}>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </button>
              ))}
            </div>

            <button className="disabled-big-btn">Generar video</button>
            <button className="back-link-btn" onClick={() => setView("result")}>
              Volver
            </button>
          </div>
        </div>
      </main>
    );
  }

  const options = {
    cuerpo: ["Delgado", "Moldeado", "Con curvas", "Definido", "Silueta pera", "Plus Size"],
    cabello: ["Rubio", "Castaño", "Pelirrojo", "Negro"],
    piel: ["Morena oscura", "Clara", "Morena"],
    fondo: ["Estudio", "Interior", "Calle", "Playa", "Naturaleza", "Lujo", "Gimnasio", "Ecommerce", "Libre"],
    luz: ["Luz de estudio", "Luz ambiente", "Luz fuerte", "Luz creativa"],
    pose: ["Sentada", "Natural", "Segura", "Relajada"],
    angulo: ["Frente", "Espalda", "Lateral"],
    encuadre: ["Cuerpo completo", "Medio cuerpo", "Detalle"],
    proporcion: ["Story (9:16)", "Feed (3:4)", "Horizontal (16:9)"],
  };

  return (
    <main className="page-wrap">
      <div className="top-icons">
        <div className="icon-pill active">👕</div>
        <div className="icon-pill">✏️</div>
        <div className="icon-pill">🎥</div>
        <div className="icon-pill">👥</div>
      </div>

      <div className="wizard-card">
        <p className="step-title">PASO {step} <span>/ 5</span></p>

        <p className="step-description">
          {step === 1 && "Comienza subiendo la foto de tu producto. Usa una imagen bien visible para obtener mejores resultados."}
          {step === 2 && "Define las características de la modelo que usará tu prenda."}
          {step === 3 && "Elige el ambiente y la iluminación para crear la atmósfera perfecta."}
          {step === 4 && "Selecciona la pose de la modelo y cómo la cámara capturará la escena."}
          {step === 5 && "Configura referencias y agrega los detalles finales antes de generar."}
        </p>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {step === 1 && (
          <>
            <h2 className="section-title">Prenda (referencia)</h2>
            <label className="upload-box">
              <input type="file" accept="image/*" onChange={handleFileChange} hidden />
              <div className="upload-icon">⬆</div>
              <div className="upload-btn">Subir foto</div>
              <p className="upload-text">Sube una imagen para empezar</p>
            </label>

            {data.uploadedImage && (
              <div className="mini-preview">
                <img src={data.uploadedImage} alt="Preview" className="mini-preview-img" />
              </div>
            )}

            <button
              className="primary-btn full-btn"
              onClick={() => setStep(2)}
              disabled={!data.uploadedImage}
            >
              Continuar
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="section-title">Apariencia de la modelo</h2>

            <p className="group-label">Rango de edad</p>
            <div className="option-grid two">
              {["Adulto", "Infantil"].map((item) => (
                <OptionButton key={item} active={data.rangoEdad === item} label={item}
                  onClick={() => updateField("rangoEdad", item)} />
              ))}
            </div>

            <p className="group-label">Edad aproximada</p>
            <div className="option-grid three">
              {["18 a 29 años", "30 a 45 años", "46+ años"].map((item) => (
                <OptionButton key={item} active={data.edadAprox === item} label={item}
                  onClick={() => updateField("edadAprox", item)} />
              ))}
            </div>

            <p className="group-label">Género</p>
            <div className="option-grid two">
              {["Femenino", "Masculino"].map((item) => (
                <OptionButton key={item} active={data.genero === item} label={item}
                  onClick={() => updateField("genero", item)} />
              ))}
            </div>

            <p className="group-label">Tipo de cuerpo</p>
            <div className="option-grid three">
              {options.cuerpo.map((item) => (
                <OptionButton key={item} active={data.tipoCuerpo === item} label={item}
                  onClick={() => updateField("tipoCuerpo", item)} />
              ))}
            </div>

            <p className="group-label">Color de cabello</p>
            <div className="option-grid four">
              {options.cabello.map((item) => (
                <OptionButton key={item} active={data.colorCabello === item} label={item}
                  onClick={() => updateField("colorCabello", item)} />
              ))}
            </div>

            <p className="group-label">Tono de piel</p>
            <div className="option-grid three">
              {options.piel.map((item) => (
                <OptionButton key={item} active={data.tonoPiel === item} label={item}
                  onClick={() => updateField("tonoPiel", item)} />
              ))}
            </div>

            <div className="bottom-actions">
              <button className="text-btn" onClick={() => setStep(1)}>Volver</button>
              <button className="primary-btn next-btn" onClick={() => setStep(3)}>Continuar</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="section-title">Escenario e iluminación</h2>

            <p className="group-label">Tipo de fondo</p>
            <div className="option-grid three">
              {options.fondo.map((item) => (
                <OptionButton key={item} active={data.fondo === item} label={item}
                  onClick={() => updateField("fondo", item)} />
              ))}
            </div>

            <p className="group-label">Tipo de iluminación</p>
            <div className="option-grid two">
              {options.luz.map((item) => (
                <OptionButton key={item} active={data.iluminacion === item} label={item}
                  onClick={() => updateField("iluminacion", item)} />
              ))}
            </div>

            <div className="bottom-actions">
              <button className="text-btn" onClick={() => setStep(2)}>Volver</button>
              <button className="primary-btn next-btn" onClick={() => setStep(4)}>Continuar</button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="section-title">Cámara y pose</h2>

            <p className="group-label">Pose de la modelo</p>
            <div className="option-grid two">
              {options.pose.map((item) => (
                <OptionButton key={item} active={data.pose === item} label={item}
                  onClick={() => updateField("pose", item)} />
              ))}
            </div>

            <p className="group-label">Ángulo de cámara</p>
            <div className="option-grid three">
              {options.angulo.map((item) => (
                <OptionButton key={item} active={data.angulo === item} label={item}
                  onClick={() => updateField("angulo", item)} />
              ))}
            </div>

            <p className="group-label">Encuadre</p>
            <div className="option-grid three">
              {options.encuadre.map((item) => (
                <OptionButton key={item} active={data.encuadre === item} label={item}
                  onClick={() => updateField("encuadre", item)} />
              ))}
            </div>

            <p className="group-label">Proporción de imagen</p>
            <div className="option-grid three">
              {options.proporcion.map((item) => (
                <OptionButton key={item} active={data.proporcion === item} label={item}
                  onClick={() => updateField("proporcion", item)} />
              ))}
            </div>

            <div className="bottom-actions">
              <button className="text-btn" onClick={() => setStep(3)}>Volver</button>
              <button className="primary-btn next-btn" onClick={() => setStep(5)}>Continuar</button>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="section-title">Finalizar y generar</h2>

            <p className="group-label">Mantener modelo/escenario</p>
            <button className="soft-btn">Usar modelo de referencia (imagen)</button>
            <button className="soft-btn">Usar escenario de referencia (imagen)</button>
            <button className="primary-btn full-btn">Generar nueva imagen</button>

            <div className="divider" />

            <p className="group-label">Adicionar detalles (opcional)</p>
            <textarea
              className="details-box"
              placeholder="Describe un poco de tu producto..."
              value={data.detalles}
              onChange={(e) => updateField("detalles", e.target.value)}
            />

            <div className="bottom-actions">
              <button className="text-btn" onClick={() => setStep(4)}>Volver</button>
              <button className="primary-btn next-btn" onClick={() => setView("result")}>Generar</button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
