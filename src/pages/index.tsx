import { GetStaticProps } from "next";
import { getPrismicCliente } from "../services/prismic";
import Prismic from "@prismicio/client";
import {RichText} from 'prismic-dom';

import Head from "next/head";

import styles from "../styles/home.module.scss"

type Content={
  title_prod: string;
  desc_prod: string;
  img_prod: string;
  title_mat: string;
  desc_mat: string;
  img_mat: string;
  title_med: string;
  desc_med: string
  img_med: string
}

interface ContentProps{
  content: Content
}

export default function Home({content}: ContentProps) {

  console.log(content);
  
  return (
    <>
    <Head>
      <title>Home - lyndas blog</title>
    </Head>
    <main className={styles.container}>
      <div className={styles.contentLeft}>
        <section>
          <h1>{content.title_prod}</h1>
          <p>{content.desc_prod}</p>
        </section>
        <img src={content.img_prod} alt="cliente" />
      </div>

      <hr />

      <div className={styles.contentRight}>
        <img src={content.img_mat} alt="tecidos" />
        <section>
          <h1>{content.title_mat}</h1>
          <p>{content.desc_mat}</p>
        </section>
      </div>

      <hr />

      <div className={styles.contentLeft}>
        <section>
          <h1>{content.title_med}</h1>
          <p>{content.desc_med}</p>
        </section>
        <img src={content.img_med} alt="medidas" />
      </div>
    </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ()=> {
  const prismic = getPrismicCliente();

  const response = await prismic.query([
    Prismic.Predicates.at("document.type", "home")
  ])

  //console.log(response.results[0].data);
  
  const {
    title_prod, desc_prod, img_prod, 
    title_mat, desc_mat, img_mat, 
    title_med, desc_med, img_med
  } = response.results[0].data

  const content ={
    title_prod: RichText.asText(title_prod),
    desc_prod: RichText.asText(desc_prod),
    img_prod: img_prod.url,
    title_mat: RichText.asText(title_mat),
    desc_mat: RichText.asText(desc_mat),
    img_mat: img_mat.url,
    title_med: RichText.asText(title_med),
    desc_med: RichText.asText(desc_med),
    img_med: img_med.url,
  }

  
  return{
    props:{
      content
    },
    revalidate: 60*60
  }
}