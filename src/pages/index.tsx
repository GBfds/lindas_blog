import Head from "next/head";

import styles from "../styles/home.module.scss"

export default function Home() {
  return (
    <>
    <Head>
      <title>Home - lyndas blog</title>
    </Head>
    <main className={styles.container}>
      <div className={styles.contentLeft}>
        <section>
          <h1>Sempre priorisando a satisfação do cliente</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic sed consequatur dolorem voluptates odio animi adipisci similique quae, assumenda voluptatum veritatis ipsum labore impedit libero rerum dolorum eum id nemo.</p>
        </section>
        <img src="/image/satisfação-do-liente.jpg" alt="cliente" />
      </div>

      <hr />

      <div className={styles.contentRight}>
        <img src="/image/tecidos.jpg" alt="tecidos" />
        <section>
          <h1>Usando sempre os melhores matereais</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi eum adipisci numquam quibusdam iste inventore deleniti error obcaecati ea magnam aperiam qui rerum nihil vel sequi, voluptatum dolores non illo?</p>
        </section>
      </div>

      <hr />

      <div className={styles.contentLeft}>
        <section>
          <h1>Roupas sobre medida para você</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident laborum, aspernatur porro maxime ratione nisi quibusdam quam aliquid odit deserunt reprehenderit cum perferendis atque cupiditate vel numquam commodi minima voluptatibus?</p>
        </section>
        <img src="/image/roupas-sobre-medida.jpg" alt="medidas" />
      </div>
    </main>
    </>
  )
}
