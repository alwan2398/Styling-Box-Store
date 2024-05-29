import { client, urlFor } from "@/client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
    const [heroImage, setHeroImage] = useState([]);

    useEffect(() => {
        const query = '*[_type == "heroImage"]';

        client.fetch(query).then((data) => {
            setHeroImage(data);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center w-full">
                {heroImage.map((hero, index) => (
                    <Carousel key={index} className="w-full">
                        <CarouselContent>
                            <CarouselItem>
                                <img className="w-full h-[200px] md:h-[400px] object-cover object-center rounded-lg" src={urlFor(hero.image1).url()} alt={hero.alt1 || 'Hero image'} />
                            </CarouselItem>
                            <CarouselItem>
                                <img className="w-full h-[200px] md:h-[400px] object-cover object-center rounded-lg" src={urlFor(hero.image2).url()} alt={hero.alt2 || 'Hero image'} />
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                ))}
            </div>

<div className="flex flex-col items-center justify-between gap-8 md:flex-row">
  <motion.div
    whileInView={{ y: [300, 0] }}
    transition={{ duration: 0.85, ease: 'easeOut' }}
    className="grid grid-cols-3 md:w-full gap-4 mt-4 overflow-hidden rounded-lg border">
    <Link to={'/category/Sepatu'} className="flex items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200 p-4 border border-gray-300">
      Sepatu
    </Link>
    <Link to={'/category/Kaos'} className="flex items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200 p-4 border border-gray-300">
      T-Shrit
    </Link>
    <Link to={'/category/Celana'} className="flex items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200 p-4 border border-gray-300">
      Celana
    </Link>
    <Link to={'/category/Jacket'} className="flex items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200 p-4 border border-gray-300">
      Jacket
    </Link>
    <Link to={'/category/Hodie'} className="flex items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200 p-4 border border-gray-300">
      Hodie
    </Link>
    <Link to={'/category/ZipHodie'} className="flex items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200 p-4 border border-gray-300">
      Ziper Hoddie
    </Link>
  </motion.div>
</div>


        </section>
    );
}

export default Hero;
