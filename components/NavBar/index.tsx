import { Connect } from "./connect"

const NavBar = () => (
    <div style={{top:0,
                        left:0,
                        width:'100vw', 
                        position: 'absolute',
                        height:'60px',
                        fontSize : '12px',
                        display: 'flex',
                        flexDirection:'row',
                        justifyContent: 'space-around',
                        alignItems : 'center',
                        fontFamily: 'suisee',
                       // borderBottom : '0.5px solid black'
                        background: 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(25px)'
                        
    }}>
            <div style={{cursor:'pointer'}}>
             SEARCH
            </div>

            <div style={{fontFamily:'suisee-medium', fontSize:'12px'}}> OASIS </div>

            <Connect/>
    </div>
)

export default NavBar
