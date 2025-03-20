import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Learn Connect</title>
        <link rel="icon" href="/images/Logo.png" />
      </Head>
      <div className="background-image d-flex justify-content-center align-items-center vh-100">
        <div className="card text-center w-75 w-sm-100" style={{ maxWidth: "24rem", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" }}>
          <div className="card-body">
            <Image
              className="img-fluid mx-auto d-block"
              src="/images/Logo.png"
              alt="Learn Connect Logo"
              width={250}
              height={250}
              priority
            />
            <p className="card-text p-4">Aprende fácil, enseña mejor: educación inteligente con IA. 🚀📚</p>

            <div className="d-flex justify-content-center align-items-center gap-4">
              <Link href="/IniciarSesion">
                <button type="button" className="btn btn-verde">Iniciar Sesión</button>
              </Link>
              <Link href="/Registro">
                <button type="button" className="btn btn-outline1">Crear Cuenta</button>
              </Link>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
