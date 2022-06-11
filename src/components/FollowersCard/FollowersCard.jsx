import React, { useEffect, useState } from 'react'
import './FollowersCard.css'
import { useMoralis } from 'react-moralis'
import { Loader } from '@mantine/core'
import UserCard from './UserCard.jsx'

const FollowersCard = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState([])
    const { Moralis } = useMoralis()

    useEffect(() => {
        setLoading(true)
        const load = async () => {
            const res = await Moralis.Cloud.run("getRecomUser");
            setUsers(res)
            setLoading(false)
        }
        load()
    }, [Moralis])

    const followUser = async (UserId) => {
        await Moralis.Cloud.run("followUser", { userId: UserId });
    }

    return (
        <div className="FollowersCard">
            <h3>Recommended Users</h3>
            {users.map((user, id) => {
                return (
                    <UserCard user={user} key={id} followUser={followUser}/>
                )
            })}
            <div style={{ height: "55px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {loading && <Loader color={"lime"} size="xl" variant="dots" />}
            </div>
        </div>
    )
}

export default FollowersCard