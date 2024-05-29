import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'
import Devloper_header from '../devloper/Devloper_header';
import Header from '../header/Header';

export default function NoNavbar({ children }) {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);
  // const[selectedRole,setSelectedRole]=useState('');
    
    useEffect(() => {
      console.log(location);
      if (location.pathname === '/' || location.pathname === '/signup' || location.pathname=== '/developer')
          setShowNavbar(false);
      else
          setShowNavbar(true);
  }, [location]);
  return ( 
  <div>{showNavbar && children}</div> 
)
}
  // <div>{showNavbar && renderHeader()}</div>

  

  // const handleRoleSelection = (role) => {
  //   setSelectedRole(role);
  //   setShowNavbar(true); 
  // };
  // const renderHeader = () => {
  //   if (location.pathname === '/signup') {
  //     return <Header />;
  //   } else if (location.pathname === '/developer') {
  //     return <Devloper_header />;
  //   } else {
  //     return <Header />;
  //   }
  // };
 

  // return (
   
  //   <div>
      /* {showNavbar && selectedRole === 'developer' ? (
        <Devloper_header/>
      ) : (
        <Header/>
      )}
      {React.cloneElement(children, { handleRoleSelection })} */
      /* <div>{showNavbar && children}</div> */
    /* </div>
  )
} */
// import React from 'react';
// import Devloper_dashboard from '../devloper/Devloper_dashboard';
// import Header from '../header/Header';

// export default function NoNavbar({ children, selectedRole }) {
//   return (
//     <div>
//       {selectedRole === 'developer' ? (
//         <Devloper_dashboard />
//       ) : (
//         <Header />
//       )}
//       {children}
//     </div>
//   );
// }