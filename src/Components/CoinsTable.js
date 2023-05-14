import { Container, createTheme, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { CoinList } from '../Config/api'
import { Cryptostate } from '../CryptoContext'
// import { numberWithCommas } from './Banner/Carousel'

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const navigate = useNavigate();

  const { currency, symbol } = Cryptostate();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleSearch = () => {
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search))
  };

  const useStyles = makeStyles()(() => ({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Roboto Condensed",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "white",
      },
    },
  }))

  const { classes } = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h5"
          style={{ margin: 18, fontFamily: "Oswald"}}
        >
          Cryptocurrency Market Capitalization Rankings
          
        </Typography>

        
        <TextField
          label="Search for a Crypto Currency.." variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)} />

        
        <TableContainer style={{borderRadius: 10, overflow: 'hidden'}}>
          {
            loading ? (
              <LinearProgress style={{ backgroundColor: "orchid" }} />
            ) : (
              <Table>
                <TableHead style={{
                  background: `linear-gradient(#4776E6,#8E54E9)`,
                }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                      <TableCell style={{
                        color: "white",
                        fontWeight: "850",
                        fontFamily: "Montserrat"
                      }}
                        key={head}
                        align={head === "Coin" ? "left" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                {/* {console.log(handleSearch())} */}

                <TableBody>{handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}
                    >
                      <TableCell
                        component='th'
                        scope='row'
                        style={{
                          display: "flex",
                          gap: 15
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height='50'
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 22,
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>
                            {row.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </TableCell>
                    </TableRow>
                  )
                })}</TableBody>
              </Table>
            )
          }
        </TableContainer>

        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable;