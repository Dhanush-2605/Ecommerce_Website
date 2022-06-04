import React from 'react'

import styled from 'styled-components'
import CategoryItem from './CategoryItem'
import { categories } from '../data'
const Container=styled.div`
display: flex;
padding: 10px;
justify-content: space-between;

`
function Category() {
  return (
    <Container>
        {categories.map((item)=>(
            <CategoryItem item={item} Key={item.id}/>

        ))}
    </Container>
  )
}

export default Category