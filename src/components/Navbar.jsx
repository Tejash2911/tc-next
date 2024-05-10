"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge } from "@mui/material";
import { publicRequest, userRequest } from "@/axiosRequestMethods";
import { logoutUser } from "@/lib/features/user/userSlilce";
import { setProduct } from "@/lib/features/cart/cartSlice";
import { mobile } from "@/responsive";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const link = {
  color: "black",
  textDecoration: "none",
};

const Container = styled.div`
  max-height: 60px;
  box-shadow: 0 3px 2px -1px rgba(0, 0, 0, 0.1);

  //sticky navbar
  position: sticky;
  top: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
`;
const Wrapper = styled.div`
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({
    display: "none",
  })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 0.5vmin;
  height: 25px;
  position: relative;
  ${mobile({
    marginLeft: "0px",
  })}
`;

const Input = styled.input`
  outline: none;
  border: none;
  background-color: transparent !important;
  width: 100%;
`;

const Ul = styled.ul`
  position: absolute;
  width: 100%;
  top: 105%;
  background-color: white;
  border-radius: 0 0 1vmax 1vmax;
  backdrop-filter: blur(16px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  padding: 0 0;
  transition: all 0.00001ms ease-in-out;
  overflow: hidden;
  display: ${(props) => props.display};
  // transition-delay: 0.5s; // this is using beacause i am doind "display: none" to ul if title target is false so wen we click on searched products li the target is getting false and the js is not running for that in my case i a redirecting  to that specific product
`;

const Li = styled.li`
  //margin: 5px 0px;
  list-style: none;
  text-align: start;
  padding: 5px 5px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: #ededeb;
  }
  &:last-child {
    border-radius: 0 0 1vmax 1vmax;
  }
`;

const Center = styled.div`
  flex: 1;
  ${mobile({
    flex: 2,
  })}
`;
const Logo = styled.h1`
  font-weight: 600;
  text-align: center;
  letter-spacing: -1px;

  ${mobile({
    textAlign: "start",
    fontSize: "1.5rem",
  })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const DropdownList = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
`;
const DropdownContainer = styled.div`
  background-color: #f5f5f5;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 110%;
  transform: translate(-35%);
  width: 150px;

  ::before {
    content: "";
    position: absolute;
    left: 50%;
    top: -6px;
    width: 10px;
    height: 10px;
    background-color: #f5f5f5;
    transform: rotate(45deg);
  }
`;
const Dropdown = styled.span`
  z-index: 2;
  padding: 10px 20px;
  background-color: inherit;
  color: black;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;

  &:hover {
    color: black;
    font-weight: 600;
  }
`;
const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  height: 100%;
  user-select: none;
  /* &:hover ${DropdownList}{
        display: block;
    } */
`;
const Hello = styled.span`
  font-size: 15px;
  font-weight: 400;
`;
const Account = styled.span`
  font-weight: 600;
  position: relative;
  display: flex;
  align-items: center;
`;

const MenueItem = styled.div`
  cursor: pointer;
  margin-left: 20px;
  padding: 10px 0;
  ${mobile({
    marginLeft: "0.6rem",
  })}
`;

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [optionIsOpen, setOptionIsOpen] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [searchProducts, setSearchProducts] = useState();

  const user = useAppSelector((state) => state.user.currentUser);
  const cartSize = useAppSelector((state) => state.cart.quantity);

  const handleSearch = async (e) => {
    if (!e.target.value) {
      return setSearchProducts(null);
    }
    try {
      const { data } = await publicRequest.get(`/api/products/search/${e.target.value}`);
      setSearchProducts(data);
    } catch (error) {
      const errorMessage = error.response?.status === 404 ? "No Products Found" : "Unable To Find Products";
      setSearchProducts([{ title: errorMessage }]);
      // if (error.response.status === 404) {
      //   return setSearchProducts([{ title: "No Products Found" }]);
      // } else {
      //   return setSearchProducts([{ title: "Unable To Find Products" }]);
      // }
    }
  };

  const handleFocus = () => {
    setIsInputFocus(true);
  };
  const handleBlur = () => {
    setIsInputFocus(false);
  };
  const handleClick = (id) => {
    router.push(`/product/${id}`);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (!user) return;
    const fetchh = async () => {
      try {
        const { data } = await userRequest.get("api/cart/size");
        dispatch(setProduct(data.size));
      } catch (error) {
        console.error("Error fetching cart size:", error);
      }
    };
    fetchh();
  }, [dispatch, user]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>
            <Link style={link} href="/">
              Title.
            </Link>
          </Logo>
        </Left>
        <Center>
          <SearchContainer>
            <Input onFocus={handleFocus} onBlur={() => handleBlur()} onChange={handleSearch} placeholder="Search" name="searchField"></Input>
            <SearchIcon style={{ colour: "grey", fontSize: 16, cursor: "pointer" }} />
            <Ul display={isInputFocus === true ? "block" : "none"}>
              {searchProducts?.map((p) => {
                return (
                  <Li key={p._id} onMouseDown={() => handleClick(p._id)}>
                    {p.title}
                  </Li>
                ); //used onMouseDown because onClick was not working over there the Input > onFocus event was overriding this event
              })}
            </Ul>
          </SearchContainer>
        </Center>
        <Right>
          {!user ? (
            <>
              <MenueItem>
                <Link style={link} href="/signup">
                  Sign Up
                </Link>
              </MenueItem>
              <MenueItem>
                <Link style={link} href="/login">
                  Log In
                </Link>
              </MenueItem>
            </>
          ) : (
            <>
              <AccountContainer onClick={() => setOptionIsOpen(!optionIsOpen)}>
                <Hello>hello, {user.firstName}</Hello>
                <Account>Account{optionIsOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</Account>
                <DropdownList open={optionIsOpen}>
                  <DropdownContainer onClick={(e) => e.stopPropagation()}>
                    <Dropdown onClick={() => navigate("/setting")}>
                      <SettingsIcon /> Setting
                    </Dropdown>
                    <Dropdown onClick={() => navigate("/orders")}>
                      <LocalMallIcon /> Orders
                    </Dropdown>
                    <Dropdown onClick={handleLogout}>
                      <LogoutIcon /> Logout
                    </Dropdown>
                  </DropdownContainer>
                </DropdownList>
              </AccountContainer>
            </>
          )}
          <MenueItem title="Cart">
            {user && (
              <Badge overlap="rectangular" badgeContent={cartSize} color="primary">
                <Link style={link} href="/cart">
                  <ShoppingCartOutlinedIcon />
                </Link>
              </Badge>
            )}
          </MenueItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
