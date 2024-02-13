import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Skeleton,
  Stack,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import Champion from "../Card";

import { SearchContext } from "../../App";

const sortByEvolution = (a, b) => {
  if (a.iconUrls.evolutionMedium && !b.iconUrls.evolutionMedium) {
    return -1;
  } else if (!a.iconUrls.evolutionMedium && b.iconUrls.evolutionMedium) {
    return 1;
  } else {
    return 0;
  }
};

const AllCards = () => {
  const [loading, setLoading] = useState(true);
  const [sortedCards, setSortedCards] = useState([]);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    // Simulate fetching data asynchronously
    setTimeout(() => {
      // Import the JSON data
      import("../../games/clash-royale/data.json")
        .then((data) => {
          if (!data || !Array.isArray(data.items)) {
            console.error(
              "Data is not in the expected format. Expected an object with an 'items' array."
            );
            return;
          }
          // Sort the data by evolution
          setSortedCards(data.items.sort(sortByEvolution));
          // Set the data to the state
          setCards(sortedCards);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 1000); // Simulate a delay of 1 second
  }, []);
  console.log("Cards data:", cards);
  const { search } = useContext(SearchContext);
  console.log(
    "Search value from all components:",
    search.search ? search.search.name : ""
  );
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(8);
  useEffect(() => {
    setStartIndex(0);
    setEndIndex(8);
  }, [search]);

  const changePage = (page) => {
    setStartIndex((page - 1) * 8);
    setEndIndex(page * 8);
  };
  const filteredCards =
    search && search.search.name
      ? sortedCards.filter((card) => card.name.includes(search.search.name))
      : sortedCards;
  return (
    <>
      {loading && (
        <>
          Fetching data...
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
      <Grid container spacing={{ xs: 1, md: 3 }} columns={12}>
        {filteredCards.slice(startIndex, endIndex).map((card) => {
          return (
            <Grid key={card.name} item xs={12} sm={6} md={3}>
              <Champion
                name={card.name}
                rarity={card.rarity}
                img={card.iconUrls.medium}
                imgEvo={card.iconUrls.evolutionMedium}
                icon={card.iconUrls.medium}
                maxlevel={card.maxLevel}
                evolevel={card.maxEvolutionLevel}
                elixr={card.elixirCost}
              />
            </Grid>
          );
        })}
      </Grid>
      <Stack spacing={2} sx={{ float: "right" }} padding={2}>
        <Pagination
          count={Math.ceil(filteredCards.length / 8)}
          variant="outlined"
          onChange={(e, page) => changePage(page)}
        />
      </Stack>
    </>
  );
};

export default AllCards;
