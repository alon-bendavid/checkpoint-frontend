import Header from "@/components/Header";
import { useAddCountryMutation, useContinentsQuery, useCountriesQuery, useGetCountryByCodeQuery } from "@/graphql/generated/schema";
import { graphQLResultHasError } from "@apollo/client/utilities";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function CountiresCard() {
    const router = useRouter();
    // const { code } = router.query;
    const { code }:any = router.query;
    // const upperCaseCode =  code.toUpperCase();
    const upperCaseCode = code.toUpperCase(); 

  const {data} =useGetCountryByCodeQuery({
    variables: {code: upperCaseCode as string},
    
  });
console.log(data);


  return( 
    <>
    <Header></Header>
<div>
<h1>{data?.country.name}</h1>
<p>{data?.country.code}</p>
</div>
    </>

  );
}
