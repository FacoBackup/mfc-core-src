import React, {useEffect, useReducer, useState} from "react";
import ACTIONS from "./deps/dataActions";
import dataReducer from "./deps/dataReducer";
import PropTypes from 'prop-types'
import axios from "axios";

const init = (e) => {
    return e
}
export default function useQuery(props) {
    const [data, dispatchData] = useReducer(dataReducer, [], init)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [filters, setFilters] = useState([])
    const [sorts, setSorts] = useState([])
    const [hasMore, setHasMore] = useState(false)

    const fetchParams = (page = undefined) => {
        let pack = {
            page: page !== undefined ? page : currentPage,
            quantity: props.fetchSize,
            filters: [...filters],
            sorts: [...sorts]
        }
        if (typeof props.parsePackage === 'function')
            pack = props.parsePackage(pack)

        pack.filters = JSON.stringify(pack.filters)
        pack.sorts = JSON.stringify(pack.sorts)

        return {
            method: 'GET',
            headers: {...props.headers, 'content-type': 'application/json'}, url: props.url,
            params: pack,
        }
    }
    const fetchData =
        (page = undefined) => {
            setLoading(true)
            const params = fetchParams(page)

            axios(
                params
            ).then(res => {

                dispatchData({type: ACTIONS.PUSH, payload: res.data})
                setHasMore(res.data.length > 0)
                setLoading(false)

            }).catch(() => null)
        }
    useEffect(() => {
        if (currentPage > 0) {
            // console.log('CURRENT PAGE FETCH', filters)
            fetchData(currentPage)
        }
    }, [currentPage])

    useEffect(() => {
        clean()
    }, [filters])

    const clean = () => {

        setHasMore(false)
        setCurrentPage(0)
        dispatchData({type: ACTIONS.EMPTY})


        fetchData(0)
    }

    return {
        data,
        filters,
        setFilters,
        sorts, setSorts,
        setCurrentPage,
        currentPage,
        hasMore,
        loading,
        clean
    }
}
useQuery.propTypes = {
    url: PropTypes.string.isRequired,
    headers: PropTypes.object,
    parsePackage: PropTypes.func,
    fetchSize: PropTypes.number
}
