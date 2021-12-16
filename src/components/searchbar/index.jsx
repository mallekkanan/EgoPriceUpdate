import React, { useEffect } from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside, useOutsideClick } from "react-click-outside-hook"; 
import { useRef } from "react";

const SearchBarContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width: 34em;
    height: 3.8em;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
    overflow: hidden:
`;

const SearchInputContainer = styled.div`
    width: 100%;
    min-height: 4em;
    display: flex;
    align-items: center;
    position: relative;
    padding: 2px 15px;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    font-size: 21px;
    color: #12112e;
    border-radius: 6px;
    font-weight: 500;
    background-color: transparent;

    &:focus {
        outline: none
        &::placeholder {
            opacity: 0;
        }
    }
    
    &::placeholder {
        color: #bebebe;
        transition: all 250ms ease-in-out;
    }
`;

const SearchIcon = styled.span`
 color: #bebebe;
 font-size: 27px;
 margin-right: 10px;
 margin-top: 6px;
 vertical-align: middle;
`;

const CloseIcon = styled(motion.span)`
    color: #bebebe;
    font-size: 23px; 
    vertical-align: middle;
    margin-right: 20px;
    transition: all 200ms ease-in-out;
    cursor: pointer;

    &:hover {
        color: #dfdfdf;
    }
`;

const containerVariants = {
    expanded: {
        height: "20em",
    },
    collapsed: {
        height: "3.8em"
    }
}

const containerTransition = { type: 'spring', damping: 22, stiffness: 150}



export function SearchBar(props) {

    const [isExpanded, setExpanded] = useState(false);
    const [parentRef, isClickedOutside] = useClickOutside();
    const inputRef = useRef()

    const expandContainer = () => {
        setExpanded(true);
    }

    const collapseContainer = () => {
        setExpanded(false);
        if(inputRef.current) 
        inputRef.current.value ="";
    }

    useEffect(() => {
        if(isClickedOutside)
        collapseContainer();
    }, [isClickedOutside]);

    return ( 
    <SearchBarContainer animate={isExpanded ? "expanded" : "collapsed"} variants={containerVariants} transition={containerTransition} ref={parentRef}>
            <SearchInputContainer>
                <SearchIcon>
                    <IoSearch />
                </SearchIcon>
            <SearchInput placeholder="Search for Series/Show" onFocus={expandContainer} ref={inputRef}/>

            <AnimatePresence>
           {isExpanded &&  <CloseIcon  key="close-icon" initial={{ opacity: 0 }} animate={{opacity: 1}} exit={{opacity:0}} transition={{duration: 0.2}} onClick={collapseContainer}>
                    <IoClose  />
                </CloseIcon>}
                </AnimatePresence>
        </SearchInputContainer>
    </SearchBarContainer>
    );
}