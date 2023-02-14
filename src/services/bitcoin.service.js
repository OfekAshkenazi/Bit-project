import axios from "axios"
import { storageService } from './async-storage.service.js'
const DATA_KEY_PRICE = "DATA_DB_PRICE"
const DATA_KEY_BLOCK = "DATA_DB_BLOCK"

export const bitcoinService = {
    getRate,
    getMarketPriceHistory,
    getAvgBlockSize,
}

async function getRate() {
    try {
        const res = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
        return res.data
    } catch (err) {
        console.log('there was an error')
        throw err
    }
}

async function getMarketPriceHistory() {
    try {
        let data = storageService.oldGet(DATA_KEY_PRICE)
        if (!data) {
            const res = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
            data = res.data
            storageService.oldSave(DATA_KEY_PRICE, data)
        }
        return data
    } catch (err) {
        console.log('there was an error')
        throw err
    }
}

async function getAvgBlockSize() {
    try {
        let data = storageService.oldGet(DATA_KEY_BLOCK)
        if (!data) {
            const res = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
            data = res.data
            storageService.oldSave(DATA_KEY_BLOCK, data)
        }
        return data
    } catch (err) {
        console.log('there was an error')
        throw err
    }
}