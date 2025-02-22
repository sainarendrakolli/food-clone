// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import * as echarts from 'echarts';
const App: React.FC = () => {
const [selectedLocation, setSelectedLocation] = useState('Mumbai');
const [searchQuery, setSearchQuery] = useState('');
const [selectedCuisine, setSelectedCuisine] = useState('All');
const [selectedPrice, setSelectedPrice] = useState('All');
const [selectedRating, setSelectedRating] = useState('All');
const [showRecipe, setShowRecipe] = useState<number | null>(null);
const [showOrderPage, setShowOrderPage] = useState<number | null>(null);
const [quantity, setQuantity] = useState<number>(1);
const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];
const cuisines = ['All', 'Indian', 'Chinese', 'Italian', 'Thai', 'Mexican'];
const priceRanges = ['All', '₹0-500', '₹500-1000', '₹1000-1500', '₹1500+'];
const ratings = ['All', '4.5+', '4.0+', '3.5+', '3.0+'];
const foodItems = [
{
id: 1,
name: 'Hyderabadi Chicken Biryani',
image: 'https://public.readdy.ai/ai/img_res/e8c86aee3cf1aa74582074717b77bdba.jpg',
price: '₹350',
rating: 4.8,
preparationTime: '30-35 min',
recipe: [
'Clean and marinate chicken with yogurt and spices for 2 hours',
'Prepare biryani masala with whole spices and ground spices',
'Par-boil basmati rice with whole spices',
'Layer marinated chicken and rice alternatively',
'Add saffron milk and fried onions',
'Seal the vessel with dough',
'Cook on dum (slow fire) for 25 minutes',
'Let it rest for 10 minutes',
'Garnish with mint and coriander',
'Serve hot with raita'
]
},
{
id: 2,
name: 'Butter Chicken',
image: 'https://public.readdy.ai/ai/img_res/16d24e4551a3d63651315ee2b9171b6c.jpg',
price: '₹400',
rating: 4.9,
preparationTime: '35-40 min',
recipe: [
'Marinate chicken in yogurt and spices overnight',
'Grill chicken in tandoor until charred',
'Prepare tomato gravy with butter and cream',
'Add kasturi methi and honey',
'Simmer chicken in gravy for 15 minutes',
'Adjust seasoning and cream',
'Add butter for glossy finish',
'Garnish with cream and kasturi methi',
'Finish with a dollop of butter',
'Serve hot with naan'
]
},
{
id: 3,
name: 'Mutton Biryani',
image: 'https://public.readdy.ai/ai/img_res/ca7e37644534ee6784b08a1fe051eb5c.jpg',
price: '₹450',
rating: 4.7,
preparationTime: '45-50 min',
recipe: [
'Marinate mutton with yogurt and biryani masala',
'Prepare brown onions and mint paste',
'Cook mutton until tender',
'Layer with aromatic rice',
'Add saffron milk and rose water',
'Seal and cook on dum',
'Rest for 15 minutes',
'Garnish with fried onions',
'Add boiled eggs',
'Serve with raita and salan'
]
},
{
id: 4,
name: 'Chicken Tikka Masala',
image: 'https://public.readdy.ai/ai/img_res/7a444e7d23ed01503807262d21d6dbb8.jpg',
price: '₹380',
rating: 4.6,
preparationTime: '30-35 min',
recipe: [
'Marinate chicken in tikka spices',
'Grill in tandoor until charred',
'Prepare onion-tomato gravy',
'Add cream and butter',
'Simmer with grilled chicken',
'Add kasuri methi',
'Adjust spices and cream',
'Garnish with coriander',
'Finish with butter',
'Serve with naan or rice'
]
},
{
id: 5,
name: 'Paneer Butter Masala',
image: 'https://public.readdy.ai/ai/img_res/19f6d0a3dc4139249e98099f0f1d7d7c.jpg',
price: '₹300',
rating: 4.5,
preparationTime: '25-30 min',
recipe: [
'Prepare tomato-cashew gravy',
'Add butter and cream',
'Cook paneer cubes separately',
'Combine with gravy',
'Add kasuri methi',
'Simmer for 10 minutes',
'Adjust seasoning',
'Add fresh cream',
'Garnish with butter',
'Serve hot with roti'
]
},
{
id: 6,
name: 'Chicken 65',
image: 'https://public.readdy.ai/ai/img_res/a8b88392e60fbc1e34516d0da3273ffa.jpg',
price: '₹280',
rating: 4.4,
preparationTime: '20-25 min',
recipe: [
'Marinate chicken with spices',
'Prepare coating mixture',
'Deep fry until crispy',
'Prepare tempering',
'Toss with curry leaves',
'Add red chili paste',
'Season with spices',
'Garnish with onions',
'Add lemon juice',
'Serve hot as starter'
]
},
{
id: 7,
name: 'Dal Makhani',
image: 'https://public.readdy.ai/ai/img_res/05834c96faa826a54fcf8df9a3d14001.jpg',
price: '₹250',
rating: 4.7,
preparationTime: '40-45 min',
recipe: [
'Soak black lentils overnight',
'Pressure cook with spices',
'Add butter and cream',
'Simmer for long hours',
'Add rajma for texture',
'Season with spices',
'Add fresh cream',
'Garnish with butter',
'Finish with kasuri methi',
'Serve hot with naan'
]
},
{
id: 8,
name: 'Fish Curry',
image: 'https://public.readdy.ai/ai/img_res/995ad8b485af262053534c60e1f362a6.jpg',
price: '₹420',
rating: 4.6,
preparationTime: '30-35 min',
recipe: [
'Clean and marinate fish',
'Prepare coconut gravy',
'Cook fish pieces',
'Add tamarind extract',
'Season with spices',
'Add curry leaves',
'Simmer until done',
'Adjust seasoning',
'Garnish with coriander',
'Serve with rice'
]
},
{
id: 9,
name: 'Malai Kofta',
image: 'https://public.readdy.ai/ai/img_res/de948f5f4b1f3567b825762469f18a28.jpg',
price: '₹320',
rating: 4.5,
preparationTime: '35-40 min',
recipe: [
'Prepare paneer kofta mixture',
'Shape and deep fry koftas',
'Make creamy gravy',
'Add nuts paste',
'Season with spices',
'Add cream and butter',
'Simmer gently',
'Add koftas before serving',
'Garnish with cream',
'Serve hot with naan'
]
},
{
id: 10,
name: 'Chicken Korma',
image: 'https://public.readdy.ai/ai/img_res/074fa4185fc75f2ffb8d4fae89d3a8a2.jpg',
price: '₹380',
rating: 4.7,
preparationTime: '35-40 min',
recipe: [
'Marinate chicken pieces',
'Prepare cashew paste',
'Cook with whole spices',
'Add cream and yogurt',
'Simmer until tender',
'Add ground spices',
'Thicken the gravy',
'Garnish with nuts',
'Add fresh cream',
'Serve with rice or naan'
]
}
];
return (
<div className="min-h-screen bg-gray-50">
{/* Header */}
<header className="bg-white shadow-md">
<div className="max-w-7xl mx-auto px-4 py-4">
<div className="flex items-center justify-between">
<h1 className="text-3xl font-bold text-blue-600">SSS</h1>
<div className="flex items-center space-x-4">
<button className="!rounded-button text-gray-600 hover:text-gray-900">Login</button>
<button className="!rounded-button bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">Sign up</button>
</div>
</div>
</div>
</header>
{/* Hero Section */}
<div className="relative h-[500px] bg-cover bg-center" style={{
backgroundImage: `url('https://public.readdy.ai/ai/img_res/c4da85f406b9f9d0b871119ed0806d23.jpg')`
}}>
<div className="absolute inset-0 bg-black bg-opacity-50">
<div className="max-w-7xl mx-auto px-4 h-full flex items-center">
<div className="text-white max-w-2xl">
<h2 className="text-5xl font-bold mb-6">Discover the best food & drinks</h2>
<div className="flex bg-white rounded-lg p-2">
<div className="relative flex-1">
<i className="fas fa-map-marker-alt absolute left-3 top-3 text-gray-400"></i>
<select
className="w-full pl-10 pr-3 py-2 text-gray-700 bg-transparent border-none focus:outline-none"
value={selectedLocation}
onChange={(e) => setSelectedLocation(e.target.value)}
>
{locations.map(location => (
<option key={location} value={location}>{location}</option>
))}
</select>
</div>
<div className="relative flex-1">
<i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
<input
type="text"
placeholder="Search for restaurant, cuisine or a dish"
className="w-full pl-10 pr-3 py-2 text-gray-700 bg-transparent border-none focus:outline-none"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>
</div>
</div>
</div>
</div>
</div>
</div>
{/* Promotional Offers Carousel */}
<div className="max-w-7xl mx-auto px-4 pt-8">
  <Swiper
    modules={[Pagination, Autoplay]}
    spaceBetween={20}
    slidesPerView={3}
    pagination={{ clickable: true }}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    className="mb-8"
  >
    <SwiperSlide>
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-4 h-40 flex items-center justify-between overflow-hidden relative">
        <div className="text-white z-10">
          <h3 className="text-xl font-bold mb-2">50% OFF on First Order</h3>
          <p className="text-sm opacity-90">Use code: WELCOME50</p>
          <button className="!rounded-button mt-3 bg-white text-purple-600 px-4 py-1 text-sm font-semibold">
            Order Now
          </button>
        </div>
        <img 
          src="https://public.readdy.ai/ai/img_res/db974d0ba6ae4a9a0b1961999fc09dcd.jpg"
          alt="Offer" 
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-80"
        />
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-4 h-40 flex items-center justify-between overflow-hidden relative">
        <div className="text-white z-10">
          <h3 className="text-xl font-bold mb-2">Free Delivery</h3>
          <p className="text-sm opacity-90">On orders above ₹499</p>
          <button className="!rounded-button mt-3 bg-white text-orange-600 px-4 py-1 text-sm font-semibold">
            Explore Menu
          </button>
        </div>
        <img 
          src="https://public.readdy.ai/ai/img_res/948ea131be2f4f2461fc841865f08f48.jpg"
          alt="Free Delivery" 
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-80"
        />
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-4 h-40 flex items-center justify-between overflow-hidden relative">
        <div className="text-white z-10">
          <h3 className="text-xl font-bold mb-2">20% OFF on Family Pack</h3>
          <p className="text-sm opacity-90">Use code: FAMILY20</p>
          <button className="!rounded-button mt-3 bg-white text-green-600 px-4 py-1 text-sm font-semibold">
            Order Now
          </button>
        </div>
        <img 
          src="https://public.readdy.ai/ai/img_res/2661713b3a2bee695cdee2efe9bf74c1.jpg"
          alt="Family Pack" 
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-80"
        />
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-4 h-40 flex items-center justify-between overflow-hidden relative">
        <div className="text-white z-10">
          <h3 className="text-xl font-bold mb-2">Special Weekend Offer</h3>
          <p className="text-sm opacity-90">Get 30% OFF on weekends</p>
          <button className="!rounded-button mt-3 bg-white text-blue-600 px-4 py-1 text-sm font-semibold">
            Learn More
          </button>
        </div>
        <img 
          src="https://public.readdy.ai/ai/img_res/e931db517b98ad0932b2c3853ba02957.jpg"
          alt="Weekend Offer" 
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-80"
        />
      </div>
    </SwiperSlide>
  </Swiper>
</div>

{/* Filters */}
<div className="max-w-7xl mx-auto px-4 pb-8">
<div className="flex space-x-4 mb-8">
<select
className="!rounded-button px-4 py-2 border border-gray-300 bg-white"
value={selectedCuisine}
onChange={(e) => setSelectedCuisine(e.target.value)}
>
{cuisines.map(cuisine => (
<option key={cuisine} value={cuisine}>{cuisine}</option>
))}
</select>
<select
className="!rounded-button px-4 py-2 border border-gray-300 bg-white"
value={selectedPrice}
onChange={(e) => setSelectedPrice(e.target.value)}
>
{priceRanges.map(price => (
<option key={price} value={price}>{price}</option>
))}
</select>
<select
className="!rounded-button px-4 py-2 border border-gray-300 bg-white"
value={selectedRating}
onChange={(e) => setSelectedRating(e.target.value)}
>
{ratings.map(rating => (
<option key={rating} value={rating}>{rating}</option>
))}
</select>
</div>
{/* Food Items Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{foodItems.map(item => (
<div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
<img src={item.image} alt={item.name} className="w-full h-48 object-cover"/>
<div className="p-4">
<div className="flex justify-between items-start mb-2">
<h3 className="text-lg font-semibold">{item.name}</h3>
<span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
{item.rating} <i className="fas fa-star text-yellow-400"></i>
</span>
</div>
<div className="flex justify-between items-center text-gray-600 mb-2">
<span>{item.price}</span>
<span>{item.preparationTime}</span>
</div>
<div className="flex space-x-2">
<button
className="!rounded-button flex-1 bg-orange-500 text-white px-4 py-2 hover:bg-orange-600"
onClick={() => setShowOrderPage(item.id)}
>
Order Now
</button>
<button
className="!rounded-button flex-1 bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
onClick={() => setShowRecipe(item.id)}
>
How to Prepare
</button>
</div>
</div>
</div>
))}
</div>
</div>
{/* Recipe Modal */}
{showRecipe !== null && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
<div className="bg-white rounded-lg max-w-md w-full p-6">
<div className="flex justify-between items-center mb-4">
<h3 className="text-xl font-semibold">How to Prepare {foodItems.find(r => r.id === showRecipe)?.name}</h3>
<button
onClick={() => setShowRecipe(null)}
className="text-gray-500 hover:text-gray-700"
>
<i className="fas fa-times"></i>
</button>
</div>
<ol className="list-decimal pl-4 space-y-2">
{foodItems.find(r => r.id === showRecipe)?.recipe.map((step, index) => (
<li key={index} className="text-gray-600">{step}</li>
))}
</ol>
<button
className="!rounded-button mt-6 w-full bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
onClick={() => setShowRecipe(null)}
>
Close
</button>
</div>
</div>
)}
{/* Order Page Modal */}
{showOrderPage !== null && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
<div className="bg-white rounded-lg max-w-md w-full p-6">
<div className="flex justify-between items-center mb-4">
<h3 className="text-xl font-semibold">{foodItems.find(r => r.id === showOrderPage)?.name}</h3>
<button
onClick={() => setShowOrderPage(null)}
className="text-gray-500 hover:text-gray-700"
>
<i className="fas fa-times"></i>
</button>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between">
<span className="text-gray-600">Price:</span>
<span className="font-semibold">{foodItems.find(r => r.id === showOrderPage)?.price}</span>
</div>
<div className="flex items-center justify-between">
<span className="text-gray-600">Quantity:</span>
<div className="flex items-center space-x-2">
<button
className="!rounded-button px-3 py-1 bg-gray-200 hover:bg-gray-300"
onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
>
<i className="fas fa-minus"></i>
</button>
<span className="w-8 text-center">{quantity}</span>
<button
className="!rounded-button px-3 py-1 bg-gray-200 hover:bg-gray-300"
onClick={() => setQuantity(prev => prev + 1)}
>
<i className="fas fa-plus"></i>
</button>
</div>
</div>
<div className="flex items-center justify-between">
<span className="text-gray-600">Total Amount:</span>
<span className="font-semibold">
₹{(parseInt(foodItems.find(r => r.id === showOrderPage)?.price.replace('₹', '') || '0') * quantity).toFixed(2)}
</span>
</div>
<button
className="!rounded-button w-full bg-green-500 text-white px-4 py-2 hover:bg-green-600"
onClick={() => {
alert('Order placed successfully!');
setShowOrderPage(null);
setQuantity(1);
}}
>
Pay Now
</button>
</div>
</div>
</div>
)}
</div>
);
};
export default App
