import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { ColorRing } from  'react-loader-spinner';

import './App.css';

const App = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/scrape') // Make sure this matches your Express route
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((error) => { console.error('Error fetching data:', error); setLoading(false); setError(true)});
  }, []);

  return (
    <Container maxWidth="lg" className='app'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} justifyContent="center" alignItems="center" className='header'> 
            <div className='logo'>
              <svg fill="none" viewBox="0 0 335 16"><path d="M8.2 12.0664L2.9.7559H0l.6 1.3359v13.3589h1V4.2292L7 15.5397h.6l5.8-12.201v12.112h2.7V.7559h-2.6L8.2 12.0664zM33.7999.756H31.2v14.6947h2.5999V.7559zM51.4999.756h-2.6v14.6947h9.4l.2-.8906-7 .089V.7559zM74.4999.756h-2.6v14.6947h9.4l.1-.8906-6.9.089V.7559zM97.4001 10.2852h-1.4l3-8.1044 2.8999 8.1044h-4.4999zM101.3.7559h-2.5999l-5.6 14.6948h1l1.7-4.453H102.2l1.6 4.453h2.8l-1.6-4.453h4.6v-.8015h-4.8L101.3.7559zM124 8.504h-1.2V1.5575h1.4c1.3 0 2.2.3563 2.8.9797.6.6234.9 1.425.9 2.4046 0 .9796-.3 1.8702-1 2.4936-.6.7125-1.6 1.0688-2.9 1.0688zm7.3 6.2342c-.3-.2672-.7-.7125-1.1-1.4249l-1.4-2.2265c-.6-.9797-1.4-1.603-2.3-1.9593 1.4-.2672 2.4-.8016 3-1.603.6-.8016 1-1.6922 1-2.5828 0-1.2468-.5-2.1374-1.5-2.939-1-.8015-2.4-1.0687-4.3-1.0687h-4.5v14.6948h2.6V9.3947h.5c1 .089 2.1.9796 3.1 2.6717l1.2 1.9593c.8 1.2469 1.9 1.8703 3.4 1.8703.6 0 1.1 0 1.5-.0891l.2-.4453h-.1c-.5-.2672-.9-.3562-1.3-.6234zM170.3 14.6492c-1.8 0-3.3-.6235-4.4-1.8703-1.2-1.2468-1.8-2.939-1.8-5.0764 0-1.8702.5-3.4733 1.5-4.631 1-1.1578 2.2-1.7812 3.7-1.7812 1.3 0 2.3.4452 3 1.425.7.9796 1 2.1373 1 3.6513.5-.178.9-.4453 1.3-.8906.4-.4452.5-.8906.5-1.514 0-.9796-.5-1.7812-1.6-2.4936-1.1-.7125-2.4-.9797-3.9-.9797-2.2 0-4.1.7125-5.8 2.0484-1.6 1.3359-2.4 3.2952-2.4 5.6998 0 2.3155.8 4.0967 2.3 5.4326 1.5 1.3359 3.5 2.0484 5.8 2.0484 2.8 0 4.9-.9797 6.4-2.939l-.3-.2672c-1.6 1.425-3.3 2.1375-5.3 2.1375zM191.2 10.2852h-.8l3-8.1044 2.9 8.1044h-5.1zm4.5-9.5293h-2.6l-5.6 14.6948h1l1.7-4.453h6.5l1.6 4.453h2.8l-1.6-4.453h4v-.8015h-4.3L195.7.7559zM222.2 12.0664L216.9.7559H214l.6 1.3359v13.3589h1V4.2292l5.4 11.3105h.6l5.8-12.201v12.112h2.7V.7559h-2.6l-5.3 11.3105zM247.8 8.5931h4.8v-.7125h-4.8V1.5574h6.9l-.1-.8015h-9.4v14.6948h9.7v-.7125h-7.1v-6.145zM272.6 8.504h-1.2V1.5575h1.4c1.3 0 2.2.3563 2.8.9797.6.6234.9 1.425.9 2.4046 0 .9796-.3 1.8702-1 2.4936-.7.7125-1.6 1.0688-2.9 1.0688zm7.3 6.2342c-.3-.2672-.7-.7125-1.1-1.4249l-1.4-2.2265c-.6-.9797-1.4-1.603-2.3-1.9593 1.4-.2672 2.4-.8016 3-1.603.6-.8016 1-1.6922 1-2.5828 0-1.2468-.5-2.1374-1.5-2.939-1-.7124-2.4-1.0687-4.3-1.0687h-4.5v14.6948h2.6V9.3947h.5c1 .089 2.1.9796 3.1 2.6717l1.2 1.9593c.8 1.2469 1.9 1.8703 3.4 1.8703.6 0 1.1 0 1.5-.0891l.2-.4453h-.1c-.6-.2672-1-.3562-1.3-.6234zM304.5 13.1351c-.8 1.1578-2 1.7812-3.4 1.7812-1.6 0-2.9-.7124-3.7-2.0483-.8-1.3359-1.3-3.1171-1.3-5.3436 0-1.7812.4-3.2061 1.2-4.3639.8-1.1578 1.9-1.7812 3.3-1.7812 1.6 0 2.9.7125 3.8 2.0484.9 1.3359 1.3 3.117 1.3 5.2545.1 1.7812-.3 3.2952-1.2 4.4529zM301 .5778c-2.2 0-4 .7125-5.4 2.1374-1.5 1.425-2.2 3.2952-2.2 5.5217s.7 4.0967 2.2 5.4326c1.4 1.3359 3.2 2.0484 5.4 2.0484s4-.7125 5.4-2.0484c1.4-1.4249 2.1-3.2061 2.1-5.5217 0-2.1374-.7-3.9186-2.2-5.3435-1.4-1.514-3.2-2.2265-5.3-2.2265zM333.5.756v10.687L325 .756h-3.2l1 1.3358v13.3589h1V3.3387l9.9 12.201h.8V.7559h-1z" fill="#96120D"></path></svg>
            </div>
            <h1>Web Scraper App</h1>
          </Grid>
          <Grid item xs={12}>
            {loading ? (
              <div className='loading-wrapper'>
                <h3>Loading</h3>
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={['#97120d', '#97120d', '#97120d', '#97120d', '#97120d']}
                />
              </div>
            ) : (
              <div>
                {error ? (
                  <p>Error. Please speak to Vicki</p>
                ) : (
                  <div className='url-container'>
                    {results?.map((result, index) => (
                      <div className='url-item-container' key={index}>
                        <h2>
                          <a href={result.url} target='_blank' rel="noreferrer">{result.websiteTitle}</a>
                        </h2>
                        <Grid container spacing={2}>
                          {result?.keywords?.map((data, dIndex) => (
                            <Grid item xs={12} md={3} key={dIndex}> 
                              <a href={data.url} target='_blank' rel="noreferrer" className='job-container'>
                                <h3>
                                  {data.title}
                                </h3>
                                {data?.keywords?.length > 0 ? (
                                  <p>Keywords Found: {data.keywords.join(', ')}</p>
                                ) : (
                                  <p>No keywords found.</p>
                                )}
                              </a>
                            </Grid>
                          ))}
                        </Grid>
                        {result.error && <p>Error: {result.error}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
