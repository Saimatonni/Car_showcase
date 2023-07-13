"use client";
import { SearchBar, CarCard, ShowMore } from "@/components";
import Hero from "@/components/Hero";
import Image from "next/image";
import { fetchCars } from "@/utils";
import { HomeProps } from "@/types";
import { useEffect, useState } from "react";

// export default async function Home({searchParams}: HomeProps) {
  export default function Home() {
  // const allCars = await fetchCars({
  //   manufacturer: searchParams.manufacturer || "",
  //   year: searchParams.year || 2022,
  //   fuel: searchParams.fuel || "",
  //   limit: searchParams.limit || 10,
  //   model: searchParams.model || "",
  // });
  // console.log(allCars)

  const [allCars, setAllcars] = useState([]);
  const [loading, setLoading] = useState(false);

  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [limit, setLimit] = useState(10);
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);

  const getCars = async () => {
    setLoading(true);
    try{
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      });
      setAllcars(result)
    } catch(error){
      console.log(error);
    } finally{
      setLoading(false);
    }
    
  }
  
  useEffect(() =>{
    getCars();
  }, [limit, manufacturer, model])



  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer}
          setModel={setModel} />
          {/* <SearchBar/> */}
          <div className="home__filter-container">
            {/* <CustomFilter title="fuel" />
            <CustomFilter title="year" /> */}
          </div>
        </div>
        {/* {!isDataEmpty ? ( */}
        {allCars.length>0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
             { loading && (
              <div className="mt-16 w-full flex-center">
                <Image
                 src="/loader.svg"
                 alt="loader"
                 width={50}
                 height={50}
                 className="object-conatin"
                />
              </div>
             )

             }

            <ShowMore
             pageNumber={limit / 10}
            isNext = {limit >allCars.length}
            setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
