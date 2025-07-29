import React, { useState } from 'react';
import Search from './Search';
import { useCart } from './CartContext';


const products = [
  { id: 1, name: "Nike Air Max", price: 149, image: "/men-black-01.png", color: "Black", gender: "Men", size: 9, category: "Running" },
  { id: 2, name: "Nike Revolution 6", price: 89, image: "/women-white-01.png", color: "White", gender: "Women", size: 7, category: "Lifestyle" },
  { id: 3, name: "Nike Pegasus Trail", price: 129, image: "/men-red-01.png", color: "Red", gender: "Men", size: 10, category: "Running" },
  { id: 4, name: "Nike Court Vision", price: 99, image: "/unisex-white-01.png", color: "White", gender: "Unisex", size: 8, category: "Basketball" },
  { id: 5, name: "Nike React Infinity", price: 159, image: "/men-black-02.png", color: "Black", gender: "Men", size: 11, category: "Running" },
  { id: 6, name: "Nike Zoom Fly", price: 139, image: "/women-red-01.png", color: "Red", gender: "Women", size: 6, category: "Running" },
  { id: 7, name: "Nike Waffle One", price: 109, image: "/unisex-white-02.png", color: "White", gender: "Unisex", size: 9, category: "Lifestyle" },
  { id: 8, name: "Nike Free Run", price: 119, image: "/men-black-03.png", color: "Black", gender: "Men", size: 10, category: "Running" },
  { id: 9, name: "Nike Blazer Mid", price: 129, image: "/women-black-01.png", color: "Black", gender: "Women", size: 7, category: "Lifestyle" },
  { id: 10, name: "Nike Air Force", price: 149, image: "/unisex-white-03.png", color: "White", gender: "Unisex", size: 8, category: "Basketball" },
  { id: 11, name: "Nike Air Max", price: 149, image: "/men-green-01.png", color: "Green", gender: "Men", size: 8, category: "Basketball" },
  { id: 12, name: "Nike Revolution 6", price: 89, image: "/unisex-blue-01.png", color: "Blue", gender: "Unisex", size: 8, category: "Running" },
  { id: 13, name: "Nike Pegasus Trail", price: 129, image: "/women-pink-01.png", color: "Pink", gender: "Women", size: 8, category: "Trail" },
  { id: 14, name: "Nike Court Vision", price: 99, image: "/men-yellow-01.png", color: "Yellow", gender: "Men", size: 9, category: "Lifestyle" },
  { id: 15, name: "Nike React Infinity", price: 159, image: "/women-black-02.png", color: "Black", gender: "Women", size: 8, category: "Running" },
  { id: 16, name: "Nike Zoom Fly", price: 139, image: "/unisex-white-05.png", color: "White", gender: "Unisex", size: 9, category: "Training" },
  { id: 17, name: "Nike Waffle One", price: 109, image: "/unisex-blue-02.png", color: "Blue", gender: "Unisex", size: 10, category: "Running" },
  { id: 18, name: "Nike Free Run", price: 119, image: "/men-white-01.png", color: "White", gender: "Men", size: 10, category: "Lifestyle" },
  { id: 19, name: "Nike Blazer Mid", price: 129, image: "/unisex-green-01.png", color: "Green", gender: "Unisex", size: 9, category: "Basketball" },
  { id: 20, name: "Nike Air Force", price: 149, image: "/unisex-yellow-01.png", color: "Yellow", gender: "Unisex", size: 8, category: "Basketball" },
  { id: 21, name: "Nike Air Max", price: 149, image: "/men-white-01.png", color: "White", gender: "Women", size: 7, category: "Running" },
  { id: 22, name: "Nike Pegasus Trail", price: 129, image: "/unisex-blue-01.png", color: "Blue", gender: "Men", size: 10, category: "Trail" },
  { id: 23, name: "Nike Court Vision", price: 99, image: "/unisex-white-05.png", color: "White", gender: "Unisex", size: 9, category: "Lifestyle" },
  { id: 24, name: "Nike Air Force", price: 149, image: "/women-red-01.png", color: "Red", gender: "Women", size: 6, category: "Basketball" }
];


const categories = ['Running', 'Lifestyle', 'Basketball'];
const genders = ['Men', 'Women', 'Unisex'];
const sizes = [6, 7, 8, 9, 10, 11];
const colors = ['Red', 'Black', 'White'];

function Collection() {
    const [filters, setFilters] = useState({
        category: '',
        gender: '',
        size: '',
        color: '',
        price: '',
    });

    const [searchTerm, setSearchTerm] = useState('');
    const { addToCart } = useCart();

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = (query) => {
        setSearchTerm(query.toLowerCase());
    };

    const filterProducts = (product) => {
        const { category, gender, size, price, color } = filters;
        const priceNum = Number(product.price);
        const searchable = `${product.name} ${product.color} ${product.gender} ${product.size}`.toLowerCase();

        return (
            searchable.includes(searchTerm) &&
            (!category || product.category === category) &&
            (!gender || product.gender === gender) &&
            (!size || product.size === Number(size)) &&
            (!color || product.color === color) &&
            (!price ||
                (price === 'under100' && priceNum < 100) ||
                (price === '100to130' && priceNum >= 100 && priceNum <= 130) ||
                (price === '130plus' && priceNum > 130))
        );
    };

    return (
        <section className="collection-section" id='collection'>
            <h2 className="collection-heading">Explore Our Collection</h2>

            <Search onSearch={handleSearch} />

            <div className="filters">
                <select name="category" onChange={handleChange} value={filters.category}>
                    <option value="">Category</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>

                <select name="gender" onChange={handleChange} value={filters.gender}>
                    <option value="">Gender</option>
                    {genders.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>

                <select name="size" onChange={handleChange} value={filters.size}>
                    <option value="">Size</option>
                    {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>

                <select name="price" onChange={handleChange} value={filters.price}>
                    <option value="">Price</option>
                    <option value="under100">Under $100</option>
                    <option value="100to130">$100 - $130</option>
                    <option value="130plus">Above $130</option>
                </select>

                <select name="color" onChange={handleChange} value={filters.color}>
                    <option value="">Color</option>
                    {colors.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <div className="collection-grid">
                {products.filter(filterProducts).map((product) => (
                    <div className="collection-card" key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Collection;
