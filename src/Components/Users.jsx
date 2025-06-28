import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { database } from '../Config/firebase';
import   './Users.css'

const Users = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [addData, setData] = useState(false);
    const [usersList, setuserList] = useState([]);
    const UserCollection = collection(database, "USERS");

    useEffect(() => {
        GetAllUser();
    }, [addData]);

    const GetAllUser = async () => {
        const Userdata = await getDocs(UserCollection);
        let userList = [];

        Userdata.forEach((data) => {
            let obj = {
                id: data.id,
                email: data.data()["email"],
                name: data.data()["name"]
            };
            userList.push(obj);
        });

        setData(false);
        setuserList(userList);
    };

    const Adduser = async () => {
        try {
            let UserObj = {
                name,
                email
            };

            // Add user to Firestore
            const docRef = await addDoc(UserCollection, UserObj);
            console.log("Document written with ID: ", docRef.id);
            
            // Clear input fields after successful addition
            setName("");
            setEmail("");
            setData(true);

        } catch (e) {
            console.log(e);
        }
    };

    const deleteData = async (index) => {
        try {
            await deleteDoc(doc(database, "USERS", usersList[index].id));
            setData(true); // Trigger re-fetch of users after deletion
        } catch (e) {
            console.log("Error deleting document:", e);
        }
    }

    return (
        <div className='Container'>
            <h1 className='Heading'>User Management</h1>
            <div className='inputContainer'>
                <input className='input'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                />
                <input className='input'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                />
                <button onClick= {() =>  Adduser()} className='Addbutton'>Add user</button>
            </div>

            <h2 className='userListHeading' >User List</h2>

            {usersList.length > 0 ? (
                usersList.map((v, i) => (
                    <div key={i} className='userItem'>
                        <h2>{v.name}</h2>
                        <h3>{v.email}</h3>
                        <button onClick={() => deleteData(i)} className='Deletebutton'>Delete</button>
                    </div>
                ))
            ) : (
                <h3>No users available</h3>
            )}
        </div>
    );
};

export default Users;






