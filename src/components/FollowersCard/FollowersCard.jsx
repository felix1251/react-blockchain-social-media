import React, {useEffect, useState} from 'react'
import './FollowersCard.css'
import { useMoralis } from 'react-moralis'
import { Loader } from '@mantine/core'

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
    }, [fetch])

    const followUser = async ( UserId ) => {
        const res = await Moralis.Cloud.run("followUser", { userId: UserId });
    }
    
    return (
        <div className="FollowersCard">
            <h3>Recommended Users</h3>
            {users.map((user, id) => {
                return (
                    <div key={id} className="follower">
                        <div>
                            <img src={user.pfp} alt="" className='followerImage' />
                            <div className="name">
                                <span>{user.username} ({user.followers})</span>
                                <span>{user.ethAddress.slice(0, 5)}...{user.ethAddress.slice(38)}</span>
                            </div>
                        </div>
                        <button className='button fc-button' onClick={()=>followUser(user.objectId)}>
                            Follow
                        </button>
                    </div>
                )
            })}
            {loading && <div className='loader'><Loader /></div>}
        </div>
    )
}

export default FollowersCard