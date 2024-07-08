import Header from "@/components/Header";
import { useAddCountryMutation, useContinentsQuery, useCountriesQuery } from "@/graphql/generated/schema";
import { graphQLResultHasError } from "@apollo/client/utilities";
import { FormEvent, useState } from "react";

export default function Countires() {
  const [error, setError] = useState("");



  const { data:dataCountries } = useCountriesQuery();
  const countries = dataCountries?.countries || [];







  return( 
    <>
    <Header>
    </Header>
<div className=" py-24 sm:py-32 flex justify-center gap-6">
            {countries?.map((country) => (
<div  className="bg-slate-300 min-w-20 p-2 " >
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
            ))}
            </div>
    </>

  );
}
