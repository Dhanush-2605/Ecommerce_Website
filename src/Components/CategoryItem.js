
import { style } from '@mui/system'
import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
flex: 1;
margin:3px;
height:70vh;
position: relative;


`
const Image=styled.img`
height:100%;
width:100%;
margin:10px;
position: absolute;
object-fit: cover;
`
const Info=styled.div`
position: absolute;

height: 100%;
width:100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const Title=styled.h1`
color:white;
margin-bottom: 20px;

`
const Button=styled.button`
border: none;
padding: 10px;
font-weight: 600;
color: gray;
background-color: white;
cursor: pointer;
`
const  CategoryItem=(props)=> {
  return (
    <Container>
      <Image src={props.item.img}/>
      <Info>
        <Title>{props.item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
    </Container>
  )
}

export default CategoryItem;