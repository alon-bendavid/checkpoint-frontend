import Header from "@/components/Header";
import { useAddCountryMutation, useContinentsQuery, useCountriesQuery } from "@/graphql/generated/schema";
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



    try {
      const res = await addCountry({ variables: { data: formJSON } });
      console.log({ res });
      alert("country added!");
    } catch (e: any) {
      console.log(e.message);
        setError(e.message);
    }
  };
  return( 
    <>
    <Header>
    </Header>

      <form onSubmit={handleSubmit} className="pb-12 mx-10 bg-slate-200 p-3 mt-2 rounded-lg justify-center">
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
            <select id="continent-select" name="continent">
            {/* {dataContinents?.continents.map((continent) => (
  <option key={continent.id} value={continent.id}>
    {continent.name}
  </option>
        ))} */}
      </select>
          </div>
        </div>

        {error !== "" && <pre className="text-red-700">{error}</pre>}
        <button className="btn btn-primary mt-12 w-full bg-rose-600 text-white  max-w-20 ">
          Add!
        </button>
      </form>
    </>

  );
}
