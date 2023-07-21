import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import useSWR from "swr"
import { getAllPost } from '../services/posts'

const fetcher = async (query) => {
  const response = await getAllPost(query)
  const dataJson = await response.json()
  const data = dataJson?.pagination?.posts
  return data
}

export default function Home() {
  const [pageIndex, setPageIndex] = useState(0)

  const { data: articles, error, isLoading } = useSWR(`?perPage=10&page=${pageIndex}`, fetcher)
  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-75'>
        <h1>
          Bienvenido al <a href="https://devkoore.com/blog">Blog!</a>
        </h1>

        <p>
          Get started by editing{' '}
          <code>pages/index.js</code>
        </p>

        <div className='row d-flex' >
          {
            !isLoading
            ? (
              articles?.data?.map((article) => (
                <div key={article._id} class="card w-50 mb-3">
                  {/* <img src={article.imageCover.url} class="card-img-top img-fluid" alt="Cover de Blog" /> */}

                  <div class="card-body">
                    <h5 class="card-title">{article.title}</h5>
                    <p class="card-text">{article.description}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              ))
            )
            : (
              Array.from(Array(10).keys(), item => (
                <div key={item} className='card w-100 mb-3 ' aria-hidden="true">
                  {/* <img src="https://placehold.co/100" width={50} class="card-img-top img-fluid" alt={`Imagen ${item}`} /> */}
                  <div class="card-body">
                    <h5 class="card-title placeholder-glow">
                      <span class="placeholder col-6"></span>
                    </h5>
                    <p class="card-text placeholder-glow">
                      <span class="placeholder col-7"></span>
                      <span class="placeholder col-4"></span>
                      <span class="placeholder col-4"></span>
                      <span class="placeholder col-6"></span>
                      <span class="placeholder col-8"></span>
                    </p>
                    <a class="btn btn-primary disabled placeholder col-6"></a>
                  </div>
                </div>
              ) )
            )
          }

        </div>
        <div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <button type='button' class="page-link" onClick={() => setPageIndex(pageIndex - 1)} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {
              Array.from(Array(articles?.totalPages).keys(), item => <li key={item._id} class={`page-item ${pageIndex === item + 1 && 'active'}`}><button type='button' class="page-link" onClick={() => setPageIndex(item + 1)}>{item + 1}</button></li>)
            }
            
            <li class="page-item">
              <button type='button' class="page-link" onClick={() => setPageIndex(pageIndex + 1)} aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
        </div>
      </main>
      <aside className='w-25'>
      <h4>Menu Lateral</h4>
      </aside>
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
