import Carousel from "../../base-elements/carousel/carousel";
import React, { FC, useState } from "react";
import ProductsCarouselLayout from "../../products-carousel/productsCarousel";
import { Button } from "react-bootstrap";
import FormPopUp from "../../formsPopUp/forms-pop-up";
interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const [showModal, setShowModal] = useState(false);

  const formElements = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      label: "Age",
      name: "age",
      type: "number",
      placeholder: "Enter your age",
    },
  ];

  const handleModalSubmit = (data: any) => {
    console.log("Form Data Submitted:", data);
  };

  const slides: string[] = [
    "https://devcarquest.wpengine.com/wp-content/uploads/2024/04/50thAnniversary.png",
    "https://devcarquest.wpengine.com/wp-content/uploads/2024/04/50thAnniversary.png",
    "https://devcarquest.wpengine.com/wp-content/uploads/2024/04/50thAnniversary.png",
  ];

  const products = [
    {
      id: 1232,
      name: "Safe Blue",
      description: "SB101",
      imagesURLs: [
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Safe+case+1A.jpg", // Library chair
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Safe+case+1B.jpg", // Another angle
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Safe+case+1C.jpg", // Another angle
      ],
      price: 22000,
      category: ["Library", "Office"],
      subCategory: "Safes",
    },
    {
      id: 3252,
      name: "Office Working Chair",
      description: "OWC1211",
      imagesURLs: [
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Office+chair+1A.jpg", // Library chair
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Office+chair+1B.jpg", // Another angle
      ],
      price: 22000,
      category: ["Library", "Office"],
      subCategory: "Safes",
    },
    {
      id: 1252,
      name: "Safe Grey",
      description: "SG1321",
      imagesURLs: [
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Safe+case+Grey+1A.jpg", // Library chair
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Safe+case+Grey+1B.jpg", // Another angle
      ],
      price: 22000,
      category: ["Library", "Office"],
      subCategory: "Safes",
    },
    {
      id: 5252,
      name: "Computed or Laptop Table",
      description: "CLT1211",
      imagesURLs: [
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Table+Laptop+plain+1A.jpg", // Library chair
        "https://asp-bza-assets.s3.eu-north-1.amazonaws.com/images/demo1/Table+Laptop+plain+1B.jpg", // Another angle
      ],
      price: 22000,
      category: ["Library", "Office"],
      subCategory: "Safes",
    },
    // {
    //   id: 1,
    //   name: "Study Chair",
    //   modelNumber: "P101",
    //   imagesURLs: [
    //     "https://images.unsplash.com/photo-1556761175-b413da4baf72", // Library chair
    //     "https://www.shutterstock.com/image-vector/computer-table-pc-printer-other-260nw-14902048.jpg", // Another angle
    //   ],
    //   price: 22000,
    //   category: ["Library"],
    //   subCategory: "Chair",
    // },
    // {
    //   id: 2,
    //   name: "Office Desk",
    //   modelNumber: "P102",
    //   imagesURLs: [
    //     "https://themagnumgroup.net/images/sample1.jpg", // Office desk
    //     "https://www.shutterstock.com/image-vector/computer-table-pc-printer-other-260nw-14902048.jpg", // Another office desk
    //   ],
    //   price: 35000,
    //   category: "Office",
    //   subCategory: "Desk",
    // },
    // {
    //   id: 3,
    //   name: "Ergonomic School Desk",
    //   modelNumber: "P103",
    //   imagesURLs: [
    //     "https://images.unsplash.com/photo-1556761175-b413da4baf72", // School desk
    //     "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", // Another school setting
    //   ],
    //   price: 28000,
    //   category: "Schools",
    //   subCategory: "Desk",
    // },
    // {
    //   id: 4,
    //   name: "Modular Bookshelf",
    //   modelNumber: "P104",
    //   imagesURLs: [
    //     "https://images.unsplash.com/photo-1556761175-b413da4baf72", // Bookshelf in a library
    //     "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", // Modern bookshelf
    //   ],
    //   price: 45000,
    //   category: "Library",
    //   subCategory: "Bookshelves",
    // },
    // {
    //   id: 5,
    //   name: "Conference Table",
    //   modelNumber: "P105",
    //   imagesURLs: [
    //     "https://images.unsplash.com/photo-1556761175-b413da4baf72", // Large conference table
    //     "https://images.unsplash.com/photo-1542744173-8e7e53415bb0", // Another conference setting
    //   ],
    //   price: 76000,
    //   category: "Office",
    //   subCategory: "Tables",
    // },
    // {
    //   id: 7,
    //   name: "Auditorium Lighting",
    //   modelNumber: "P107",
    //   imagesURLs: [
    //     "https://images.unsplash.com/photo-1556761175-b413da4baf72", // Auditorium lighting
    //     "https://images.unsplash.com/photo-1509042239860-f550ce710b93", // Another lighting setup
    //   ],
    //   price: 67000,
    //   category: "Auditorium",
    //   subCategory: "Lighting",
    // },
  ];

  return (
    <div>
      <Carousel slides={slides} height={400} />
      <div className="App">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Open Modal
        </Button>
        <FormPopUp
          show={showModal}
          title="Create Product"
          handleClose={() => setShowModal(false)}
          handleSubmit={handleModalSubmit}
          formElements={formElements}
        />
      </div>
      <ProductsCarouselLayout
        products={products}
        isImages={false}
        images={[]}
        heading="Hot Collections"
      />
      <ProductsCarouselLayout
        products={products}
        isImages={false}
        images={[]}
        heading="Best Deals"
      />
      <ProductsCarouselLayout
        products={products}
        isImages={false}
        images={[]}
        heading="Trending"
      />

      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
