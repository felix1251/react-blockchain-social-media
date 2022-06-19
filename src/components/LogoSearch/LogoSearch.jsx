import React, { useState } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import "./LogoSearch.css";
import { Loader, Popover } from "@mantine/core";
import { useMoralis } from "react-moralis";
import SearchResultCard from "../SearchResult/SearchResult";
const LogoSearch = (props) => {
    const {onModal, setModalOpened} = props
    const [result, setResult] = useState([])
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [hasmore, setHasmore] = useState(false)
    const { Moralis } = useMoralis()

    const search = async (value) => {
        setLoading(true)
        const res = await Moralis.Cloud.run("search", { text: value })
        if(res.length > 0){
            setHasmore(true)
        }else{
            setHasmore(false)
        }
        setResult(res)
        setLoading(false)
    }

    const closeModal = () => {
        if(onModal) setModalOpened(false)
    }

    return (
        <Popover
            opened={visible}
            onFocusCapture={() => setVisible(true)}
            onClose={() => setVisible(false)}
            trapFocus={false}
            onBlurCapture={() => setVisible(false)}
            position="bottom"
            title="Search results."
            closeOnClickOutside={true}
            styles={{ popover: { width: '100%', minWidth: "230px" }, title: { fontWeight: 800 } }}
            target={<div className="LogoSearch">
                <div className="Search">
                    <input type="text" placeholder="Search.." onChange={(e) => search(e.target.value)} />
                    <div className="logo-icon">
                        <UilSearch />
                    </div>
                </div>
            </div>}
        >
            {result.length > 0 ?
                <div style={{ display: 'flex', flexDirection: "column", gap: ".3rem", alignItems: "center" }}>
                    {result.map((res, key) => (
                        <SearchResultCard key={key} pfp={res.pfp} username={res.username} ethAddress={res.ethAddress} closeModal={closeModal}/>
                    ))}
                </div>
                :
                <div className="search-loader">
                    {loading && <Loader variant="dots" color="orange"/> }
                    {!loading && !hasmore && <span>No results..</span> }
                </div>
            }

        </Popover>
    );
};

export default LogoSearch;
