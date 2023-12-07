async function getData() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();
  console.log("I have got data!");
  return <h1>{data.full_name}</h1>;
}
