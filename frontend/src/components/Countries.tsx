import Header from "@/components/Header";
import { useAddCountryMutation, useContinentsQuery, useCountriesQuery } from "@/graphql/generated/schema";
import { graphQLResultHasError } from "@apollo/client/utilities";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function CountiresCard() {
  const [error, setError] = useState("");



  const { data:dataCountries } = useCountriesQuery();
  const countries = dataCountries?.countries || [];







  return( 
    <>

<div className=" flex flex-col  gap-6 m-6 md:flex-row justify-between">
            {countries?.map((country) => (
                  <Link key={country.id} href={`/countries/${country.code}`}>

<div   className="bg-slate-300  p-4" >
<div>
    {
        country.name
    } 
    </div>
    <div>

    {
        country.code
    }
    </div>
    <div>
    {
        country.emoji
    } 
    </div>
</div>
                </Link>
            ))}
            </div>
    </>

  );
}
