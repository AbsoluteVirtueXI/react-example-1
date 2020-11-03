import React, { useState, useEffect } from 'react'
import { Heading, Text } from '@chakra-ui/core'
import { ethers } from 'ethers'

function EthersTab() {
  const [isEtherem, setIsEtherem] = useState(false)
  const [isEnable, setIsEnable] = useState(false)
  const [account, setAccount] = useState('0x0')
  const [network, setNetwork] = useState(null)
  const [balance, setBalance] = useState(0)

  // check if ethereum is injected
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setIsEtherem(true)
    } else setIsEtherem(false)
  }, [])

  // connect metamask to app
  useEffect(() => {
    ;(async () => {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        const account = accounts[0] // tableau de 1 element
        setIsEnable(true)
        setAccount(account)
      } catch (e) {
        setIsEnable(false)
      }
    })()
  }, [isEtherem])

  useEffect(() => {
    ;(async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const network = await provider.getNetwork()
      const _balance = await provider.getBalance(account)
      const balance = ethers.utils.formatEther(_balance)
      setNetwork(network)
      setBalance(balance)
    })()
  }, [isEnable, account])

  return (
    <>
      <Heading>Web3 with ethers.js</Heading>
      <Text>Metamask status: {isEnable ? 'connected' : 'disconnect'}</Text>
      {network !== null && (
        <>
          <Text>Account: {account}</Text>
          <Text>Network name: {network.name}</Text>
          <Text>Network id: {network.chainId}</Text>
          <Text>Balance: {balance}</Text>
        </>
      )}
    </>
  )
}

export default EthersTab

/*
import React, { useEffect, useReducer } from 'react'
import {
  Button,
  Heading,
  HStack,
  Input,
  ListItem,
  UnorderedList,
  VStack,
  Link,
} from '@chakra-ui/core'
import axios from 'axios'

const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      }
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true }
    case 'SET_QUERY':
      return { ...state, query: action.payload }
    case 'SET_URL':
      return { ...state, url: action.payload }
    default:
      throw new Error(`Unhandled action ${action.type} in fetchReducer`)
  }
}

const initialState = {
  data: { hits: [] },
  query: 'redux',
  url: 'https://hn.algolia.com/api/v1/search?query=redux',
  isLoading: false,
  isError: false,
}

function FetchTab() {
  const [state, dispatch] = useReducer(fetchReducer, initialState)
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })
      try {
        const result = await axios(state.url)
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' })
      }
    }
    fetchData()
  }, [state.url])
  return (
    <VStack mb={10}>
      <Heading>Fetch content with useEffect hook</Heading>
      <Heading mb={10} size="lg">
        And manage state with useReducer
      </Heading>
      <HStack mb={5}>
        <Input
          type="text"
          value={state.query}
          onChange={(event) =>
            dispatch({ type: 'SET_QUERY', payload: event.target.value })
          }
        />
        <Button
          size="lg"
          colorScheme="pink"
          isLoading={state.isLoading}
          loadingText="Searching"
          onClick={() =>
            dispatch({
              type: 'SET_URL',
              payload: `http://hn.algolia.com/api/v1/search?query=${state.query}`,
            })
          }
        >
          Search
        </Button>
      </HStack>
      {state.isError && <div>Something went wrong ...</div>}
      {state.isLoading ? (
        <></>
      ) : (
        <UnorderedList>
          {state.data.hits.map((item) => (
            <ListItem>
              <Link href={item.url} isExternal>
                {item.title}
              </Link>
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </VStack>
  )
}

export default FetchTab

*/
