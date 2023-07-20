import "./Product.scss";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import propertyApi from "../../api/propertyApi";
import ProductItem from "./ProductItem/ProductItem";
function Product() {
  const navigate = useNavigate();
  const { content, category, province, district, ward, price, acreage } =
    useParams();
  const [listProperty, setListProperty] = useState([]);
  // const [address, setAddress] = useState("");
  useEffect(() => {
    getAllProperty();
  }, []);
  const getAllProperty = async () => {
    // if (sessionStorage.getItem("searchCategory")) {
    // try {
    //   let res = await propertyApi.searchCategory("Nha-rieng");
    //   setListProperty(res.data);
    // } catch (err) {
    //   console.log("err", err);
    // }
    // }
    // if (sessionStorage.getItem("searchContent")) {
    try {
      let res = await propertyApi.search(
        content !== "undefined" ? content : ""
      );
      setListProperty(res.data);
    } catch (err) {
      console.log("err", err);
    }
    // }
    // try {
    //   const res = await propertyApi.getAll();
    //   setListProperty(res.data);
    // } catch (err) {
    //   console.log("err", err);
    // }
  };
  const handleGetDetail = (slug) => {
    navigate(`/chi-tiet/${slug}`);
  };
  listProperty.sort((a, b) => b.Real_Easte.type - a.Real_Easte.type);
  // Search By Category
  if (category !== "undefined") {
    let listCat = listProperty.filter((e) => {
      return e.Real_Easte.category == category;
    });
    listCat.sort((a, b) => b.Real_Easte.type - a.Real_Easte.type);
    //Search By Category and Address
    if (ward !== "undefined") {
      const address = `${ward}, ${district}, ${province}`;
      const listWard = listCat.filter((e) => {
        return e.Info.address.includes(address) == true;
      });
      //Search By Category and Address and Price
      if (price !== "undefined") {
        if (price === "500000000") {
          const listPrice = listWard.filter((e) => {
            return parseInt(e.Info.price) < parseInt(price);
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        } else if (price === "60000000000") {
          const listPrice = listWard.filter((e) => {
            return parseInt(e.Info.price) > parseInt(price);
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        } else {
          const post = price.indexOf("-");
          const start = price.slice(0, post);
          const end = price.slice(post + 1);
          const listPrice = listWard.filter((e) => {
            return (
              parseInt(e.Info.price) >= parseInt(start) &&
              parseInt(e.Info.price) <= parseInt(end)
            );
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        }
      }
      //Search By Category and Address and Acreage
      else if (acreage !== "undefined") {
        if (acreage === "30") {
          const listAcreage = listWard.filter((e) => {
            return e.Info.acreage < parseInt(acreage);
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        } else if (acreage === "500") {
          const listAcreage = listWard.filter((e) => {
            return e.Info.acreage > parseInt(acreage);
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        } else {
          const post = acreage.indexOf("-");
          const start = acreage.slice(0, post);
          const end = acreage.slice(post + 1);
          const listAcreage = listWard.filter((e) => {
            return (
              e.Info.acreage >= parseInt(start) &&
              e.Info.acreage <= parseInt(end)
            );
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        }
      } else {
        return (
          <ProductItem list={listWard} handleGetDetail={handleGetDetail} />
        );
      }
    }
    //Search By Category and Address
    else if (district !== "undefined") {
      const address = `${district}, ${province}`;
      const listDistrict = listCat.filter((e) => {
        return e.Info.address.includes(address) == true;
      });
      //Search By Category and Address and Price
      if (price !== "undefined") {
        if (price === "500000000") {
          const listPrice = listDistrict.filter((e) => {
            return parseInt(e.Info.price) < parseInt(price);
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        } else if (price === "60000000000") {
          const listPrice = listDistrict.filter((e) => {
            return parseInt(e.Info.price) > parseInt(price);
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        } else {
          const post = price.indexOf("-");
          const start = price.slice(0, post);
          const end = price.slice(post + 1);
          const listPrice = listDistrict.filter((e) => {
            return (
              parseInt(e.Info.price) >= parseInt(start) &&
              parseInt(e.Info.price) <= parseInt(end)
            );
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        }
      }
      //Search By Category and Address and Acreage
      else if (acreage !== "undefined") {
        if (acreage === "30") {
          const listAcreage = listDistrict.filter((e) => {
            return e.Info.acreage < parseInt(acreage);
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        } else if (acreage === "500") {
          const listAcreage = listDistrict.filter((e) => {
            return e.Info.acreage > parseInt(acreage);
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        } else {
          const post = acreage.indexOf("-");
          const start = acreage.slice(0, post);
          const end = acreage.slice(post + 1);
          const listAcreage = listDistrict.filter((e) => {
            return (
              e.Info.acreage >= parseInt(start) &&
              e.Info.acreage <= parseInt(end)
            );
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        }
      } else {
        return (
          <ProductItem list={listDistrict} handleGetDetail={handleGetDetail} />
        );
      }
    } else if (province !== "undefined") {
      const address = `${province}`;
      const listProvinces = listCat.filter((e) => {
        return e.Info.address.includes(address) == true;
      });
      //Search By Category and Address and Price
      if (price !== "undefined") {
        if (price === "500000000") {
          const listPrice = listProvinces.filter((e) => {
            return parseInt(e.Info.price) < parseInt(price);
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        } else if (price === "60000000000") {
          const listPrice = listProvinces.filter((e) => {
            return parseInt(e.Info.price) > parseInt(price);
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        } else {
          const post = price.indexOf("-");
          const start = price.slice(0, post);
          const end = price.slice(post + 1);
          const listPrice = listProvinces.filter((e) => {
            return (
              parseInt(e.Info.price) >= parseInt(start) &&
              parseInt(e.Info.price) <= parseInt(end)
            );
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        }
      }
      //Search By Category and Address and Acreage
      else if (acreage !== "undefined") {
        if (acreage === "30") {
          const listAcreage = listProvinces.filter((e) => {
            return e.Info.acreage < parseInt(acreage);
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        } else if (acreage === "500") {
          const listAcreage = listProvinces.filter((e) => {
            return e.Info.acreage > parseInt(acreage);
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        } else {
          const post = acreage.indexOf("-");
          const start = acreage.slice(0, post);
          const end = acreage.slice(post + 1);
          const listAcreage = listProvinces.filter((e) => {
            return (
              e.Info.acreage >= parseInt(start) &&
              e.Info.acreage <= parseInt(end)
            );
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        }
      } else {
        return (
          <ProductItem list={listProvinces} handleGetDetail={handleGetDetail} />
        );
      }
    }
    //Search By Category and Price
    else if (price !== "undefined") {
      if (price === "500000000") {
        const listPrice = listProperty.filter((e) => {
          return parseInt(e.Info.price) < parseInt(price);
        });
        return (
          <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
        );
      } else if (price === "60000000000") {
        const listPrice = listProperty.filter((e) => {
          return parseInt(e.Info.price) > parseInt(price);
        });
        return (
          <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
        );
      } else {
        const post = price.indexOf("-");
        const start = price.slice(0, post);
        const end = price.slice(post + 1);
        const listPrice = listProperty.filter((e) => {
          return (
            parseInt(e.Info.price) >= parseInt(start) &&
            parseInt(e.Info.price) <= parseInt(end)
          );
        });
        return (
          <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
        );
      }
    }
    //Search By Category and Acreage
    else if (acreage !== "undefined") {
      if (acreage === "30") {
        const listAcreage = listProperty.filter((e) => {
          return e.Info.acreage < parseInt(acreage);
        });
        return (
          <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
        );
      } else if (acreage === "500") {
        const listAcreage = listProperty.filter((e) => {
          return e.Info.acreage > parseInt(acreage);
        });
        return (
          <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
        );
      } else {
        const post = acreage.indexOf("-");
        const start = acreage.slice(0, post);
        const end = acreage.slice(post + 1);
        const listAcreage = listProperty.filter((e) => {
          return (
            e.Info.acreage >= parseInt(start) && e.Info.acreage <= parseInt(end)
          );
        });
        return (
          <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
        );
      }
    }
    //Result Search By Category
    else {
      return <ProductItem list={listCat} handleGetDetail={handleGetDetail} />;
    }
  }
  //Search By Address
  else if (
    province !== "undefined" ||
    district !== "undefined" ||
    ward !== "undefined"
  ) {
    if (ward !== "undefined") {
      const address = `${ward}, ${district}, ${province}`;
      const listWard = listProperty.filter((e) => {
        return e.Info.address.includes(address) == true;
      });
      //Search By Category and Address and Price
      if (price !== "undefined") {
        if (price === "500000000") {
          const listPrice = listWard.filter((e) => {
            return parseInt(e.Info.price) < parseInt(price);
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        } else if (price === "60000000000") {
          const listPrice = listWard.filter((e) => {
            return parseInt(e.Info.price) > parseInt(price);
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        } else {
          const post = price.indexOf("-");
          const start = price.slice(0, post);
          const end = price.slice(post + 1);
          const listPrice = listWard.filter((e) => {
            return (
              parseInt(e.Info.price) >= parseInt(start) &&
              parseInt(e.Info.price) <= parseInt(end)
            );
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        }
      }
      //Search By Category and Address and Acreage
      else if (acreage !== "undefined") {
        if (acreage === "30") {
          const listAcreage = listWard.filter((e) => {
            return e.Info.acreage < parseInt(acreage);
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        } else if (acreage === "500") {
          const listAcreage = listWard.filter((e) => {
            return e.Info.acreage > parseInt(acreage);
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        } else {
          const post = acreage.indexOf("-");
          const start = acreage.slice(0, post);
          const end = acreage.slice(post + 1);
          const listAcreage = listWard.filter((e) => {
            return (
              e.Info.acreage >= parseInt(start) &&
              e.Info.acreage <= parseInt(end)
            );
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        }
      } else {
        return (
          <ProductItem list={listWard} handleGetDetail={handleGetDetail} />
        );
      }
    } else if (district !== "undefined") {
      const address = `${district}, ${province}`;
      const listDistrict = listProperty.filter((e) => {
        return e.Info.address.includes(address) == true;
      });
      //Search By Category and Address and Price
      if (price !== "undefined") {
        if (price === "500000000") {
          const listPrice = listDistrict.filter((e) => {
            return parseInt(e.Info.price) < parseInt(price);
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        } else if (price === "60000000000") {
          const listPrice = listDistrict.filter((e) => {
            return parseInt(e.Info.price) > parseInt(price);
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        } else {
          const post = price.indexOf("-");
          const start = price.slice(0, post);
          const end = price.slice(post + 1);
          const listPrice = listDistrict.filter((e) => {
            return (
              parseInt(e.Info.price) >= parseInt(start) &&
              parseInt(e.Info.price) <= parseInt(end)
            );
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        }
      }
      //Search By Category and Address and Acreage
      else if (acreage !== "undefined") {
        if (acreage === "30") {
          const listAcreage = listDistrict.filter((e) => {
            return e.Info.acreage < parseInt(acreage);
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        } else if (acreage === "500") {
          const listAcreage = listDistrict.filter((e) => {
            return e.Info.acreage > parseInt(acreage);
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        } else {
          const post = acreage.indexOf("-");
          const start = acreage.slice(0, post);
          const end = acreage.slice(post + 1);
          const listAcreage = listDistrict.filter((e) => {
            return (
              e.Info.acreage >= parseInt(start) &&
              e.Info.acreage <= parseInt(end)
            );
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        }
      } else {
        return (
          <ProductItem list={listDistrict} handleGetDetail={handleGetDetail} />
        );
      }
    } else if (province !== "undefined") {
      const address = `${province}`;
      const listProvinces = listProperty.filter((e) => {
        return e.Info.address.includes(address) == true;
      });
      //Search By Category and Address and Price
      if (price !== "undefined") {
        if (price === "500000000") {
          const listPrice = listProvinces.filter((e) => {
            return parseInt(e.Info.price) < parseInt(price);
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        } else if (price === "60000000000") {
          const listPrice = listProvinces.filter((e) => {
            return parseInt(e.Info.price) > parseInt(price);
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        } else {
          const post = price.indexOf("-");
          const start = price.slice(0, post);
          const end = price.slice(post + 1);
          const listPrice = listProvinces.filter((e) => {
            return (
              parseInt(e.Info.price) >= parseInt(start) &&
              parseInt(e.Info.price) <= parseInt(end)
            );
          });
          //Search By Category and Address and Price and Acreage
          if (acreage !== "undefined") {
            if (acreage === "30") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage < parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else if (acreage === "500") {
              const listAcreage = listPrice.filter((e) => {
                return e.Info.acreage > parseInt(acreage);
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            } else {
              const post = acreage.indexOf("-");
              const start = acreage.slice(0, post);
              const end = acreage.slice(post + 1);
              const listAcreage = listPrice.filter((e) => {
                return (
                  e.Info.acreage >= parseInt(start) &&
                  e.Info.acreage <= parseInt(end)
                );
              });
              return (
                <ProductItem
                  list={listAcreage}
                  handleGetDetail={handleGetDetail}
                />
              );
            }
          } else {
            return (
              <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />
            );
          }
        }
      }
      //Search By Category and Address and Acreage
      else if (acreage !== "undefined") {
        if (acreage === "30") {
          const listAcreage = listProvinces.filter((e) => {
            return e.Info.acreage < parseInt(acreage);
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        } else if (acreage === "500") {
          const listAcreage = listProvinces.filter((e) => {
            return e.Info.acreage > parseInt(acreage);
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        } else {
          const post = acreage.indexOf("-");
          const start = acreage.slice(0, post);
          const end = acreage.slice(post + 1);
          const listAcreage = listProvinces.filter((e) => {
            return (
              e.Info.acreage >= parseInt(start) &&
              e.Info.acreage <= parseInt(end)
            );
          });
          return (
            <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
          );
        }
      } else {
        return (
          <ProductItem list={listProvinces} handleGetDetail={handleGetDetail} />
        );
      }
    }
  }
  //Search By Price
  else if (price !== "undefined") {
    if (price === "500000000") {
      const listPrice = listProperty.filter((e) => {
        return parseInt(e.Info.price) < parseInt(price);
      });
      return <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />;
    } else if (price === "60000000000") {
      const listPrice = listProperty.filter((e) => {
        return parseInt(e.Info.price) > parseInt(price);
      });
      return <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />;
    } else {
      const post = price.indexOf("-");
      const start = price.slice(0, post);
      const end = price.slice(post + 1);
      const listPrice = listProperty.filter((e) => {
        return (
          parseInt(e.Info.price) >= parseInt(start) &&
          parseInt(e.Info.price) <= parseInt(end)
        );
      });
      return <ProductItem list={listPrice} handleGetDetail={handleGetDetail} />;
    }
  }
  //Search By Acreage
  else if (acreage !== "undefined") {
    if (acreage === "30") {
      const listAcreage = listProperty.filter((e) => {
        return e.Info.acreage < parseInt(acreage);
      });
      return (
        <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
      );
    } else if (acreage === "500") {
      const listAcreage = listProperty.filter((e) => {
        return e.Info.acreage > parseInt(acreage);
      });
      return (
        <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
      );
    } else {
      const post = acreage.indexOf("-");
      const start = acreage.slice(0, post);
      const end = acreage.slice(post + 1);
      const listAcreage = listProperty.filter((e) => {
        return (
          e.Info.acreage >= parseInt(start) && e.Info.acreage <= parseInt(end)
        );
      });
      return (
        <ProductItem list={listAcreage} handleGetDetail={handleGetDetail} />
      );
    }
  } else {
    //Result By Content
    return (
      <ProductItem list={listProperty} handleGetDetail={handleGetDetail} />
    );
  }
}

export default Product;
