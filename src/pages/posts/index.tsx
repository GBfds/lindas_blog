import { GetStaticProps } from "next";
import { getPrismicCliente } from "../../services/prismic";
import Prismic from "@prismicio/client";
import {RichText} from "prismic-dom";

import Head from "next/head";
import { HiChevronDoubleLeft, HiChevronLeft, HiChevronRight, HiChevronDoubleRight } from "react-icons/hi";

import styles from "./styles.module.scss";
import { useState } from "react";

type Posts={
    slug: string,
    image: string,
    title: string;
    description: string;
    updatedAt: string;
}

interface PostsProps{
    contentPosts: Posts[],
    page: string,
    totalPage: string
}

export default function Posts({contentPosts, page, totalPage}: PostsProps){

    const [posts, setPosts] = useState(contentPosts) || []
    const [currentPage, setCurrentPage] = useState(Number(page))

    async function getPage(pageNumber:Number) {
        const prismic = getPrismicCliente();

        const response = await prismic.query([
            Prismic.predicates.at("document.type", "post")
        ],{
            orderings: "[document.last_publication_date desc] ",
            fetch: ["post.title", "post.description", "post.banner"],
            pageSize:3,
            page: String(pageNumber)
        })

        return response;
    }

    async function outherPage(pageNumber: Number){
        const response = await getPage(pageNumber);

        if (response.results.length === 0){
            return;
        }

        const getPosts = response.results.map(post => {
            return{
                slug: post.uid,
                image: post.data.banner.url,
                title: post.data.title,
                description: post.data.description.find(content => content.type === "paragraph")?.text ?? "",
                updatedAt: new Date(post.last_publication_date).toLocaleDateString("pr-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                })
            }
        })

        setCurrentPage(Number(pageNumber))
        setPosts(getPosts);
        
    }

    return(
        <>
        <Head>
            Postagens - lyndas blog
        </Head>
        <main className={styles.container}>
            {posts.map(post => (
                <article key={post.slug} className={styles.post}>
                    <img src={post.image} alt={post.title} />
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                </article>
            ))}


            <div className={styles.paginacao}>
                {currentPage >= 2 &&(
                    <div className={styles.left}>
                        <button onClick={() => outherPage(1)}>
                            <HiChevronDoubleLeft size={20}/>
                        </button>
                        <button onClick={() => outherPage(currentPage - 1)}>
                            <HiChevronLeft size={20}/>
                        </button>
                    </div>
                )}
                {currentPage < Number(totalPage) &&(
                <div className={styles.right}>
                    <button onClick={() => outherPage(currentPage + 1)}>
                        <HiChevronRight size={20}/>
                    </button>
                    <button  onClick={() => outherPage(Number(totalPage))}>
                        <HiChevronDoubleRight size={20}/>
                    </button>
                </div>
                )}
            </div>

        </main>
        </>
    )
}

export const getStaticProps: GetStaticProps =async () => {
    const prismic = getPrismicCliente();

    const response = await prismic.query([
        Prismic.predicates.at("document.type", "post")
    ],{
        orderings: "[document.last_publication_date desc] ",
        fetch: ["post.title", "post.description", "post.banner"],
        pageSize:3
    })

    const contentPosts = response.results.map(post => {
        return{
            slug: post.uid,
            image: post.data.banner.url,
            title: post.data.title,
            description: post.data.description.find(content => content.type === "paragraph")?.text ?? "",
            updatedAt: new Date(post.last_publication_date).toLocaleDateString("pr-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            })
        }
    })
    

    return{
        props:{
            contentPosts,
            page: response.page,
            totalPage: response.total_pages
        },
        revalidate: 60* 30
    }
}