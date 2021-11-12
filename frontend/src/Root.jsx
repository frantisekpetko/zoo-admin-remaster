import React from "react";
import HeadHtml from "app/HeadHtml";
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';
import "./index.scss";
import AppContext from './context/AppContext';
import API from 'utils/API';
import PageForVerifyEntry from './PageForVerifyEntry';
import {reactLocalStorage} from 'reactjs-localstorage';
import AppStore from 'store/AppStore';
import isEmpty from "support/Functions";


class Root extends React.Component{
    hasUnmounted = false;

    state = {
        canVisit: AppStore.canVisit,
        isAuthorized: AppStore.isAuthorized,
        isAdmin: AppStore.isAdmin,
        isSuperAdmin: AppStore.isSuperAdmin,
        isCustomer: AppStore.isCustomer,
        dummyPassword: AppStore.dummyPassword,
        shoppingBasketCount: AppStore.shoppingBasketCount,
        category: AppStore.category,
        givePropToHighestComponent: AppStore.givePropToHighestComponent,
        onChangeShoppingBasket: (order) => {
            console.log("On change order");
            this.setState({shoppingBasketCount: order});
        },
        onChangeCategory: (category) => {
            this.setState({ category: category});
        },
        setProductByOrder: (product, count) => {
            console.log("Local Storage set");
            //const prevProduct = reactLocalStorage.getObject('orderProduct');
            // ...prevProduct,
            //commands.log("Local Storage set Length", this.state.getProductByOrder().product.length);
            let p = null;
            product.shoppingBasketCount = count;
            
            if (!(isEmpty(this.state.getProductByOrder()))) {
                if ( this.state.getProductByOrder().product.length >= 2) {
                    const prevProducts = this.state.getProductByOrder().product;
                    p = reactLocalStorage.setObject('orderProduct',  {
                        product: [...prevProducts,  product]
                    });
                }
                else {
                    const prevProduct = this.state.getProductByOrder().product[0];

                    p = reactLocalStorage.setObject('orderProduct',  {
                        product: [prevProduct,  product]
                    });
                }
            }
            else {
                    p = reactLocalStorage.setObject('orderProduct',  {
                        product: [product]
                    });
            }

            console.log(p);
        },
        getProductByOrder: () => {
            return reactLocalStorage.getObject('orderProduct');
        },
        onUserLoginSucceed: (auth) => {
            this.getAuthVerification().then(() => this.props.history.push("/"))
        },
        deleteProductByOrder: () => {
            reactLocalStorage.clear();
        }
    };

 
    changePassword = (event) => {

        const dummyPassword = event.target.value;
        this.setState({dummyPassword: dummyPassword});
      
        dummyPassword === "ap3152019" ? localStorage.setItem("canVisit", true) : null;
    };

    changeState = (prop) => {
        this.setState(prop);
    };

    componentDidMount() {
        this.getAuthVerification();
        this.getProducts();
    }


    getProducts = async () => {
        try {
            const res = await API.get("product");
            console.log("Succesful response: \n", res);
            this.hasUnmounted && this.setState({products: res.data[0].collection[0]});


        }
        catch (e) {
            console.warn(`Fetch error occurred:\n ${e}`)
        }
    };


    getAuthVerification = async () => {

        try {
            if (this.hasUnmounted) {
                return;
            }
            const res =  await API.get("admin/auth");
            console.log(res.data);
            console.log("prod", process.env.NODE_ENV === "production");
            const auth= res.data.auth;
            console.log("Authenticated: " +  auth);
            console.log("Authenticated type: ", typeof auth);

            this.setState({ isAuthorized: auth !== null, isAdmin: auth === "adminsrc" });
        }
        catch(e){
            console.log(e);
        }

    };



    render() {
        const {isAdmin} = this.state;
        const {isAuthorized} = this.state;
        const canVisit = localStorage.getItem("canVisit") !== null;

        return <React.Fragment>
            <HeadHtml pageTitle="Se srdcem pro zvířata"/>
                {
                    canVisit ? (
                        !isAuthorized
                        ? <AppContext.Provider value={this.state }><PublicRoutes /></AppContext.Provider>
                        : <AppContext.Provider value={this.state }><PrivateRoutes/></AppContext.Provider>
                    )
                        : <PageForVerifyEntry changePassword={this.changePassword} />

                }
        </React.Fragment>;
    }

}

export default withRouter(Root);