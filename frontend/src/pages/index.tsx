// import CountiresCard from "@/components/countries";
// import Countries from "@/components/countries";
import CountiresCard from "@/components/Countries";
import Header from "@/components/Header";
import { ObjectId, useAddCountryMutation, useContinentsQuery, useCountriesQuery } from "@/graphql/generated/schema";
import { graphQLResultHasError } from "@apollo/client/utilities";
import { FormEvent, useState } from "react";

export default function Home() {
  const [error, setError] = useState("");

  const [addCountry] = useAddCountryMutation();


  const {data:dataContinents} = useContinentsQuery();

  const { data:dataCountries } = useCountriesQuery();
  const countries = dataCountries?.countries || [];


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.continent = {id: parseInt(formJSON.continent, 10) };



    try {
      const res = await addCountry({ variables: { data: formJSON  } });
      console.log({ res });
      alert("country added!");
    } catch (e: any) {
      console.log(e.message);
        setError(e.message);
    }
  };
  return( 
    < >
    <Header>
    </Header>
<div className="flex justify-center"> 


      <form onSubmit={handleSubmit} className="flex flex-col pb-12 w-60 md:w-80 bg-slate-200 p-3 mt-5 rounded-lg justify-center">
        <div className="flex flex-wrap gap-6 mb-3">
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="name">
              <span className="label-text">Country Name</span>
            </label>
            <input
              required
              type="text"
              name="name"
              id="name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="code">
              <span className="label-text">Country Code</span>
            </label>
            <input
              type="text"
              name="code"
              id="code"
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mb-3">
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="emoji">
              <span className="label-text">Country emoji</span>
            </label>
            <input
              type="text"
              name="emoji"
              id="emoji"
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>

   
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="continenet">
              <span className="label-text">Continents</span>
            </label>
            <select id="continent" name="continent">
            {dataContinents?.continents.map((continent) => (
  <option key={continent.id} value={continent.id}>
    {continent.name}
  </option>
        ))}
      </select>
          </div>
        </div>

        {error !== "" && <pre className="text-red-700">{error}</pre>}
        <button className="btn btn-primary mt-12 w-full bg-rose-600 text-white  max-w-20 ">
          Add!
        </button>
      </form>
</div>
      <CountiresCard>
      </CountiresCard>
    </>

  );
}
