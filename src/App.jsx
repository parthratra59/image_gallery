import React from 'react'
import { useState,useEffect } from 'react'
import styled from 'styled-components';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './App.css'
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const App = () => {

    const[image,setimage]=useState([])

    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageClick = (image) => {
      setSelectedImage(image);
    };
  
    const handleCloseModal = () => {
      setSelectedImage(null);
    };
  
    const  fetching = async()=>{
        try{
            const response = await fetch('https://api.unsplash.com/search/photos?page=1&query=morning&client_id=aLUuZGcWOlW8CLMJvhEsJ-Au9nRS7u5dDNgXpECGg2M');
            // json mai bhi hm convert krte toh rukna pdta hai
            const data= await response.json();
            console.log(data);
            setimage(data.results);
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
      fetching()
    
      return () => {
          fetching()

        
      }
    }, [])
    // for escape button
    useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
    

    return (
     
      
      <Wrapper className='cont'>
      

        <Carousel  responsive={responsive} showDots={false} >
          {image.map((value, index) => (
            <div key={index} className='container'>
              <div className='wrapper'>
                <div className='banner-image'>
                  <figure  >
                    <img  src={value.urls.regular} alt='Unsplash' key={index} onClick={()=>handleImageClick(value)}/>
                  </figure>
                  
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        {selectedImage && (
        <Modal>
          <ModalContent>
            <img src={selectedImage.urls.small} alt='Unsplash' />
            <CloseButton onClick={handleCloseModal}>Close</CloseButton>
          </ModalContent>
        </Modal>
      )}
      </Wrapper>
   
    );
  };

export default App;


const Wrapper = styled.section`
  padding: 3rem;
  font-family: 'Lexend Deca Light';
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
 
 
 
  
  .container {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 20px;
  filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
   /* Adjust the width to your desired value */
}

  .banner-image {
    position: relative;
    display: flex;
    align-items: ;
    justify-content: center;
    height: 0;
    width: 10em;
    padding-bottom: 100%; /* Maintain a square aspect ratio */
    overflow: hidden;
    border-radius: 12px;
  }
  .banner-image:hover {
  box-shadow: 5px 5px 5px 1px #800020;
}
  .banner-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor:pointer;
}


  
  
`;



const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  ${'' /* if we will not do zindex=-1 then the part will be blured cloursel */}
  z-index: -1;

`;

const ModalContent = styled.div`
  position: relative;
  width: 100%;
  height: 70vh; /* Adjust the percentage as needed */
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;
