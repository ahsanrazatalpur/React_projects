// src/pages/Home.jsx
import React from 'react';
import { usePlayer } from './PlayerContext'; // make sure this is correct


const trendingSongs = [

  
  {
    id: 1,
    title: "Khuda Aur Mohabbat 3 (OST)",
    artist: "Rahat Fateh Ali Khan, Nish Asher",
    cover: "/Khudaaurmuhabbat.png",
    audio: "/khudaaurmuhabbat.mp3"
  },
  {
    id: 2,
    title: "Sanam Supari (Sindhi Song)",
    artist: "Sindhi Folk",
    cover: "/SanamSupari.png",
    audio: "/sanamsupari.mp3"
  },
  {
    id: 3,
    title: "Ho Jamalo (Sindhi Folk)",
    artist: "Sindhi Folk",
    cover: "/Hojamalo.png",
    audio: "/Dil_Diyan_Gallan_Song___Tiger_Zinda_Hai___Salman_Khan,_Katrina_Kaif___Atif_Aslam___Vishal___Shekhar(48k).mp3"
  },
  {
    id: 4,
    title: "Pal Pal (Pakistani Song)",
    artist: "Ahmed Jahanzeb",
    cover: "/palpal.png",
    audio: "/palpal.mp3"
  },
  {
    id: 5,
    title: "Afreen Afreen",
    artist: "Rahat Fateh Ali Khan",
    cover: "/afreen.png",
    audio: "/Coke_Studio_Season_9__Tera_Woh_Pyar__Momina_Mustehsan___Asim_Azhar(48k).mp3"
  },
  {
    id: 6,
    title: "Bakhuda",
    artist: "Atif Aslam",
    cover: "/newsomg.png",
    audio: "/khudaaurmuhabbat.mp3"
  },
  {
    id: 7,
    title: "Tera Woh Pyar",
    artist: "Asim Azhar, Momina Mustehsan",
    cover: "/newsong2.png",
    audio: "/Coke_Studio_Season_9__Tera_Woh_Pyar__Momina_Mustehsan___Asim_Azhar(48k).mp3"
  },
  {
    id: 8,
    title: "Pasoori",
    artist: "Ali Sethi, Shae Gill",
    cover: "/pasoori.png",
    audio: "/Coke_Studio___Season_14___Pasoori___Ali_Sethi_x_Shae_Gill(48k).mp3"
  },
  {
    id: 9,
    title: "Sajni",
    artist: "Strings",
    cover: "/newsomg.png",
    audio: "/Jeene_Laga_Hoon___Ramaiya_Vastavaiya___Girish_Kumar,_Shruti_Haasan___Atif_Aslam,_Shreya_Goshal(48k).mp3"
  },
  {
    id: 10,
    title: "Tajdar-e-Haram",
    artist: "Atif Aslam",
    cover: "afreen.png",
    audio: "/Coke_Studio_Season_8__Tajdar-e-Haram__Atif_Aslam(48k).mp3"
  },
  {
    id: 11,
    title: "Dil Diyan Gallan",
    artist: "Atif Aslam",
    cover: "dildyangallan.png",
    audio: "Dil_Diyan_Gallan_Song___Tiger_Zinda_Hai___Salman_Khan,_Katrina_Kaif___Atif_Aslam___Vishal___Shekhar(48k).mp3"
  },
  {
    id: 12,
    title: "Jeene Laga Hoon",
    artist: "Atif Aslam",
    cover: "/newsong2.png",
    audio: "Jeene_Laga_Hoon___Ramaiya_Vastavaiya___Girish_Kumar,_Shruti_Haasan___Atif_Aslam,_Shreya_Goshal(48k).mp3"
  }

];
const pakistaniSongs = [
   
  {
    id: 1,
    title: "Khuda Aur Mohabbat 3 (OST)",
    artist: "Rahat Fateh Ali Khan, Nish Asher",
    cover: "/Khudaaurmuhabbat.png",
    audio: "/khudaaurmuhabbat.mp3"
  },
  {
    id: 2,
    title: "Sanam Supari (Sindhi Song)",
    artist: "Sindhi Folk",
    cover: "/SanamSupari.png",
    audio: "/sanamsupari.mp3"
  },
  {
    id: 3,
    title: "Jeene Laga Hoon",
    artist: "Atif Aslam",
    cover: "/newsong2.png",
    audio: "Jeene_Laga_Hoon___Ramaiya_Vastavaiya___Girish_Kumar,_Shruti_Haasan___Atif_Aslam,_Shreya_Goshal(48k).mp3"
  },
  {
    id: 4,
    title: "Pal Pal",
    artist: "Ahmed Jahanzeb",
    cover: "/palpal.png",
    audio: "palpal.mp4"
  },
  {
    id: 5,
    title: "Afreen Afreen",
    artist: "Rahat Fateh Ali Khan",
    cover: "/afreen.png",
    audio: "Coke_Studio_Season_9__Tera_Woh_Pyar__Momina_Mustehsan___Asim_Azhar(48k).mp3"
  },
  {
    id: 10,
    title: "Sanam Supari (Sindhi Song)",
    artist: "Sindhi Folk",
    cover: "/SanamSupari.png",
    audio: "/sanamsupari.mp3"
  },
  {
    id: 10,
    title: "Sanam Supari (Sindhi Song)",
    artist: "Sindhi Folk",
    cover: "/SanamSupari.png",
    audio: "/sanamsupari.mp3"
  },
  {
    id: 10,
    title: "Sanam Supari (Sindhi Song)",
    artist: "Sindhi Folk",
    cover: "/SanamSupari.png",
    audio: "/sanamsupari.mp3"
  },
  {
    id: 9,
    title: "Pal Pal",
    artist: "Ahmed Jahanzeb",
    cover: "/palpal.png",
    audio: "palpal.mp4"
  },
  {
    id: 10,
    title: "Sanam Supari (Sindhi Song)",
    artist: "Sindhi Folk",
    cover: "/SanamSupari.png",
    audio: "/sanamsupari.mp3"
  },
  {
    id: 11,
    title: "Pasoori",
    artist: "Ali Sethi, Shae Gill",
    cover: "/pasoori.png",
    audio: "Coke_Studio___Season_14___Pasoori___Ali_Sethi_x_Shae_Gill(48k).mp3"
  },
  {
    id: 5,
    title: "Afreen Afreen",
    artist: "Rahat Fateh Ali Khan",
    cover: "/afreen.png",
    audio: "Coke_Studio_Season_9__Tera_Woh_Pyar__Momina_Mustehsan___Asim_Azhar(48k).mp3"
  },
];
const bollywoodSongs = [
   {
    id: 1,
    title: "Tajdar-e-Haram",
    artist: "Atif Aslam",
    cover: "afreen.png",
    audio: "/Coke_Studio_Season_8__Tajdar-e-Haram__Atif_Aslam(48k).mp3"
  },
  {
    id: 2,
    title: "Jeene Laga Hoon",
    artist: "Atif Aslam",
    cover: "/newsong2.png",
    audio: "Jeene_Laga_Hoon___Ramaiya_Vastavaiya___Girish_Kumar,_Shruti_Haasan___Atif_Aslam,_Shreya_Goshal(48k).mp3"
  },
  {
    id: 3,
    title: "Pal Pal (Pakistani Song)",
    artist: "Ahmed Jahanzeb",
    cover: "/palpal.png",
    audio: "/palpal.mp3"
  },
  {
    id: 4,
    title: "Sanam Supari (Sindhi Song)",
    artist: "Sindhi Folk",
    cover: "/SanamSupari.png",
    audio: "/sanamsupari.mp3"
  },
  
  {
    id: 5,
    title: "Khuda Aur Mohabbat 3 (OST)",
    artist: "Rahat Fateh Ali Khan, Nish Asher",
    cover: "/Khudaaurmuhabbat.png",
    audio: "/khudaaurmuhabbat.mp3"
  },
  {
    id: 6,
    title: "Jeene Laga Hoon",
    artist: "Atif Aslam",
    cover: "/newsong2.png",
    audio: "Jeene_Laga_Hoon___Ramaiya_Vastavaiya___Girish_Kumar,_Shruti_Haasan___Atif_Aslam,_Shreya_Goshal(48k).mp3"
  },
];

const Home = () => {
  const { setCurrentSong } = usePlayer(); // ✅ Hook to trigger player

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    else if (hour < 18) return 'Good afternoon';
    else return 'Good evening';
  };

  const handleImgError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x300.png?text=No+Cover';
  };

  const renderCards = (songs) =>
    songs.map((song) => (
      <div className="card" key={song.id} onClick={() => setCurrentSong(song)}>
        <img src={song.cover} alt={song.title} onError={handleImgError} />
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
        <button className="play-btn">▶️</button>
      </div>
    ));

  return (
    <div className="home">
      <div className="home-header">
        <h2>{greeting()}</h2>
      </div>

      <div className="section">
        <h3>🔥 Featured Playlists</h3>
        <div className="card-row">{renderCards(trendingSongs)}</div>
      </div>

      <div className="section">
        <h3>🎧 Made for You</h3>
        <div className="card-row">{renderCards(pakistaniSongs)}</div>
      </div>

      <div className="section">
        <h3>🎬 Bollywood Latest Songs</h3>
        <div className="card-row">{renderCards(bollywoodSongs)}</div>
      </div>
    </div>
  );
};

export default Home;
