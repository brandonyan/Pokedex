document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/150");
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  fetchData();
  return () => {};
}, []);
