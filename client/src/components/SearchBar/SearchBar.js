import React, { Component } from "react";
import { Row, Col, Button, Container, Table } from "bootstrap-4-react";
import Select from "react-select";

import { Display4 } from "bootstrap-4-react";
import style from "./SearchBar.css";

const options = [
  {
    value: "Accolade Elm",
    label: "Accolade Elm"
  },

  {
    value: "African Iris",
    label: "African Iris"
  },
  {
    value: "After Dark Peppermint Tree",
    label: "After Dark Peppermint Tree"
  },
  {
    value: "Agave",
    label: "Agave"
  },
  {
    value: "Alkali Bulrush / Sturdy Bulrush",
    label: "Alkali Bulrush / Sturdy Bulrush"
  },
  {
    value: "Alkali Weed",
    label: "Alkali Weed"
  },
  {
    value: "Alkali-heath",
    label: "Alkali-heath"
  },
  {
    value: "Aloe",
    label: "Aloe"
  },
  {
    value: "Alum Root",
    label: "Alum Root"
  },
  {
    value: "Amani Senecio",
    label: "Amani Senecio"
  },
  {
    value: "American arborvitae",
    label: "American arborvitae"
  },
  {
    value: "American Dogwood",
    label: "American Dogwood"
  },
  {
    value: "American Dune Grass",
    label: "American Dune Grass"
  },
  {
    value: "American Sweetgum",
    label: "American Sweetgum"
  },
  {
    value: "American sycamore",
    label: "American sycamore"
  },
  {
    value: "Annual Fireweed",
    label: "Annual Fireweed"
  },
  {
    value: "Apricot Sunrose",
    label: "Apricot Sunrose"
  },
  {
    value: "Arizona beggarticks",
    label: "Arizona beggarticks"
  },
  {
    value: "Arroyo Willow",
    label: "Arroyo Willow"
  },
  {
    value: "Australian Bluebell Creeper",
    label: "Australian Bluebell Creeper"
  },
  {
    value: "Australian Fuchsia",
    label: "Australian Fuchsia"
  },
  {
    value: "Australian fuschia",
    label: "Australian fuschia"
  },
  {
    value: "Australian fuschia",
    label: "Australian fuschia"
  },
  {
    value: "Australian Tea Tree",
    label: "Australian Tea Tree"
  },
  {
    value: "Australian Thorny Saltbush",
    label: "Australian Thorny Saltbush"
  },
  {
    value: "Australian Willow",
    label: "Australian Willow"
  },
  {
    value: "Autumn Blaze Maple, Freeman Maple",
    label: "Autumn Blaze Maple, Freeman Maple"
  },
  {
    value: "Autumn Sage",
    label: "Autumn Sage"
  },
  {
    value: "Banksia",
    label: "Banksia"
  },
  {
    value: "barberry;Mountain grape",
    label: "barberry;Mountain grape"
  },
  {
    value: "Beach Morning Glory",
    label: "Beach Morning Glory"
  },
  {
    value: "Beach/Dune Knotweed",
    label: "Beach/Dune Knotweed"
  },
  {
    value: "Bear Grass",
    label: "Bear Grass"
  },
  {
    value: "Bear's Breech",
    label: "Bear's Breech"
  },
  {
    value: "Bear's foot hellebore",
    label: "Bear's foot hellebore"
  },
  {
    value: "Bearberry Cotoneaster",
    label: "Bearberry Cotoneaster"
  },
  {
    value: "Beardless wild rye",
    label: "Beardless wild rye"
  },
  {
    value: "Bee's Bliss Sage",
    label: "Bee's Bliss Sage"
  },
  {
    value: "Bentgrass",
    label: "Bentgrass"
  },
  {
    value: "bentgrass",
    label: "bentgrass"
  },
  {
    value: "Berkley sedge",
    label: "Berkley sedge"
  },
  {
    value: "Big Sagebrush",
    label: "Big Sagebrush"
  },
  {
    value: "Bigleaf Maple",
    label: "Bigleaf Maple"
  },
  {
    value: "birch",
    label: "birch"
  },
  {
    value: "Bird's Eye Gilia",
    label: "Bird's Eye Gilia"
  },
  {
    value: "Bishop Pine",
    label: "Bishop Pine"
  },
  {
    value: "Bitter cherry",
    label: "Bitter cherry"
  },
  {
    value: "Black sage",
    label: "Black sage"
  },
  {
    value: "Black-eyed Susan",
    label: "Black-eyed Susan"
  },
  {
    value: "Blanket flower",
    label: "Blanket flower"
  },
  {
    value: "Blazing Star",
    label: "Blazing Star"
  },
  {
    value: "Blood Red Trumpet Vine",
    label: "Blood Red Trumpet Vine"
  },
  {
    value: "Blue Chalk Stalks",
    label: "Blue Chalk Stalks"
  },
  {
    value: "Blue Elderberry",
    label: "Blue Elderberry"
  },
  {
    value: "Blue finger",
    label: "Blue finger"
  },
  {
    value: "blue grama",
    label: "blue grama"
  },
  {
    value: "Blue Hibiscus",
    label: "Blue Hibiscus"
  },
  {
    value: "Blue Mist, Blue Beard",
    label: "Blue Mist, Blue Beard"
  },
  {
    value: "Blue Oat Grass",
    label: "Blue Oat Grass"
  },
  {
    value: "Blue Wheatgrass, Magellan Wheatgrass",
    label: "Blue Wheatgrass, Magellan Wheatgrass"
  },
  {
    value: "Blue Wild-rye",
    label: "Blue Wild-rye"
  },
  {
    value: "Blue-eyed Grass",
    label: "Blue-eyed Grass"
  },
  {
    value: "Blueblossom",
    label: "Blueblossom"
  },
  {
    value: "Bog sage",
    label: "Bog sage"
  },
  {
    value: "Bolander's Goldenaster",
    label: "Bolander's Goldenaster"
  },
  {
    value: "Borage",
    label: "Borage"
  },
  {
    value: "Bougainvillea",
    label: "Bougainvillea"
  },
  {
    value: "Bower Wattle",
    label: "Bower Wattle"
  },
  {
    value: "Bowles Mauve Wallflower",
    label: "Bowles Mauve Wallflower"
  },
  {
    value: "Box Elder",
    label: "Box Elder"
  },
  {
    value: "Bracken Fern",
    label: "Bracken Fern"
  },
  {
    value: "Bramble",
    label: "Bramble"
  },
  {
    value: "Brandegee sage",
    label: "Brandegee sage"
  },
  {
    value: "Brazilian Cedarwood  \nBrazilian Cedarwood",
    label: "Brazilian Cedarwood  \nBrazilian Cedarwood"
  },
  {
    value: "Bright Star Yucca",
    label: "Bright Star Yucca"
  },
  {
    value: "Brisbane Box",
    label: "Brisbane Box"
  },
  {
    value: "Brittlebush",
    label: "Brittlebush"
  },
  {
    value: "Broadleaf Cattail",
    label: "Broadleaf Cattail"
  },
  {
    value: "Broadleaf Stonecrop",
    label: "Broadleaf Stonecrop"
  },
  {
    value: "Brodiaea",
    label: "Brodiaea"
  },
  {
    value: "Bronze Loquat",
    label: "Bronze Loquat"
  },
  {
    value: "Brownie Thistle",
    label: "Brownie Thistle"
  },
  {
    value: "Buffalo Grass",
    label: "Buffalo Grass"
  },
  {
    value: "Bull Clover",
    label: "Bull Clover"
  },
  {
    value: "bur oak",
    label: "bur oak"
  },
  {
    value: "Bush Anemone",
    label: "Bush Anemone"
  },
  {
    value: "Bush Germander",
    label: "Bush Germander"
  },
  {
    value: "Bush morninglory",
    label: "Bush morninglory"
  },
  {
    value: "Bush Sedum  \n Bush Sedum",
    label: "Bush Sedum  \n Bush Sedum"
  },
  {
    value: "Bush Sunflower",
    label: "Bush Sunflower"
  },
  {
    value: "Butterfly Gaura",
    label: "Butterfly Gaura"
  },
  {
    value: "buttonbush",
    label: "buttonbush"
  },
  {
    value: "CA. Desert Bluebells\nBluebells",
    label: "CA. Desert Bluebells\nBluebells"
  },
  {
    value: "Cabbage Palm",
    label: "Cabbage Palm"
  },
  {
    value: "Cajeput Tree",
    label: "Cajeput Tree"
  },
  {
    value: "Cajeput tree",
    label: "Cajeput tree"
  },
  {
    value: "Calamint",
    label: "Calamint"
  },
  {
    value: "California Aster",
    label: "California Aster"
  },
  {
    value: "California bay laurel",
    label: "California bay laurel"
  },
  {
    value: "California Bee Plant",
    label: "California Bee Plant"
  },
  {
    value: "California black walnut",
    label: "California black walnut"
  },
  {
    value: "California Blackberry",
    label: "California Blackberry"
  },
  {
    value: "California bluebell",
    label: "California bluebell"
  },
  {
    value: "California Brome",
    label: "California Brome"
  },
  {
    value: "California Buckeye",
    label: "California Buckeye"
  },
  {
    value: "California Buckwheat",
    label: "California Buckwheat"
  },
  {
    value: "California Buckwheat",
    label: "California Buckwheat"
  },
  {
    value: "California Buckwheat;St. Catherine's Lace?",
    label: "California Buckwheat;St. Catherine's Lace?"
  },
  {
    value: "California Bulrush",
    label: "California Bulrush"
  },
  {
    value: "California Buttercup",
    label: "California Buttercup"
  },
  {
    value: "California Canarygrass",
    label: "California Canarygrass"
  },
  {
    value: "California Celery",
    label: "California Celery"
  },
  {
    value: "California coneflower",
    label: "California coneflower"
  },
  {
    value: "California Dogwood",
    label: "California Dogwood"
  },
  {
    value: "California Fescue",
    label: "California Fescue"
  },
  {
    value: "California Fuchsia",
    label: "California Fuchsia"
  },
  {
    value: "California Gilia",
    label: "California Gilia"
  },
  {
    value: "California Goldfields",
    label: "California Goldfields"
  },
  {
    value: "California Hazelnut",
    label: "California Hazelnut"
  },
  {
    value: "California Honeysuckle",
    label: "California Honeysuckle"
  },
  {
    value: "California Horkelia",
    label: "California Horkelia"
  },
  {
    value: "California Indian Pink",
    label: "California Indian Pink"
  },
  {
    value: "California Indian Pink",
    label: "California Indian Pink"
  },
  {
    value: "California larkspur",
    label: "California larkspur"
  },
  {
    value: "California Lilac",
    label: "California Lilac"
  },
  {
    value: "California maidenhair fern",
    label: "California maidenhair fern"
  },
  {
    value: "California Melic ",
    label: "California Melic "
  },
  {
    value: "California Morning Glory",
    label: "California Morning Glory"
  },
  {
    value: "California Oatgrass",
    label: "California Oatgrass"
  },
  {
    value: "California Phacelia",
    label: "California Phacelia"
  },
  {
    value: "California Poppy",
    label: "California Poppy"
  },
  {
    value: "California Sagebrush",
    label: "California Sagebrush"
  },
  {
    value: "California Sagebrush",
    label: "California Sagebrush"
  },
  {
    value: "California saltbush",
    label: "California saltbush"
  },
  {
    value: "California sycamore",
    label: "California sycamore"
  },
  {
    value: "California Thistle",
    label: "California Thistle"
  },
  {
    value: "California Wax Myrtle, Pacific Bayberry",
    label: "California Wax Myrtle, Pacific Bayberry"
  },
  {
    value: "California White Sage",
    label: "California White Sage"
  },
  {
    value: "California Wild Grape",
    label: "California Wild Grape"
  },
  {
    value: "California Wild Rose",
    label: "California Wild Rose"
  },
  {
    value: "California yerba santa,  Yerba santa ",
    label: "California yerba santa,  Yerba santa "
  },
  {
    value: "Canary Island Rose",
    label: "Canary Island Rose"
  },
  {
    value: "Canyon gooseberry",
    label: "Canyon gooseberry"
  },
  {
    value: "Canyon Live Oak",
    label: "Canyon Live Oak"
  },
  {
    value: "Cape Honeysuckle",
    label: "Cape Honeysuckle"
  },
  {
    value: "Cape Mendicino Reed Grass",
    label: "Cape Mendicino Reed Grass"
  },
  {
    value: "Cape Province Pygmyweed",
    label: "Cape Province Pygmyweed"
  },
  {
    value: "cape rush",
    label: "cape rush"
  },
  {
    value: "Carmel creeper",
    label: "Carmel creeper"
  },
  {
    value: "Carpet Geranium",
    label: "Carpet Geranium"
  },
  {
    value: "Carrot Wood",
    label: "Carrot Wood"
  },
  {
    value: "Cat Mint",
    label: "Cat Mint"
  },
  {
    value: "Catalina Cherry",
    label: "Catalina Cherry"
  },
  {
    value: "Catalina Ironwood",
    label: "Catalina Ironwood"
  },
  {
    value: "Caterpillar phacelia",
    label: "Caterpillar phacelia"
  },
  {
    value: "Catlin sedge",
    label: "Catlin sedge"
  },
  {
    value: "catmint",
    label: "catmint"
  },
  {
    value: "Catmint",
    label: "Catmint"
  },
  {
    value: "Catnip",
    label: "Catnip"
  },
  {
    value: "Cedros Island Verbena",
    label: "Cedros Island Verbena"
  },
  {
    value: "Centaury",
    label: "Centaury"
  },
  {
    value: "Chalk Dudleya",
    label: "Chalk Dudleya"
  },
  {
    value: "chamomile",
    label: "chamomile"
  },
  {
    value: "chaparral currant",
    label: "chaparral currant"
  },
  {
    value: "Chaste Tree",
    label: "Chaste Tree"
  },
  {
    value: "Checkerbloom",
    label: "Checkerbloom"
  },
  {
    value: "Chinese fringe tree",
    label: "Chinese fringe tree"
  },
  {
    value: "Chinese Hackberry",
    label: "Chinese Hackberry"
  },
  {
    value: "Chinese Houses",
    label: "Chinese Houses"
  },
  {
    value: "Clematis",
    label: "Clematis"
  },
  {
    value: "Cleveland Sage",
    label: "Cleveland Sage"
  },
  {
    value: "Clustered Field Sedge",
    label: "Clustered Field Sedge"
  },
  {
    value: "Coahuila Sage",
    label: "Coahuila Sage"
  },
  {
    value: "Coast Angelica",
    label: "Coast Angelica"
  },
  {
    value: "Coast Barberry",
    label: "Coast Barberry"
  },
  {
    value: "Coast Buckwheat",
    label: "Coast Buckwheat"
  },
  {
    value: "Coast Fiddleneck",
    label: "Coast Fiddleneck"
  },
  {
    value: "Coast Live Oak",
    label: "Coast Live Oak"
  },
  {
    value: "Coast Manroot",
    label: "Coast Manroot"
  },
  {
    value: "Coast Purple Sage",
    label: "Coast Purple Sage"
  },
  {
    value: "Coast range melic",
    label: "Coast range melic"
  },
  {
    value: "Coast Rosemary",
    label: "Coast Rosemary"
  },
  {
    value: "Coast Silktassel",
    label: "Coast Silktassel"
  },
  {
    value: "Coast Strawberry",
    label: "Coast Strawberry"
  },
  {
    value: "Coast Tarweed",
    label: "Coast Tarweed"
  },
  {
    value: "Coastal Banksia",
    label: "Coastal Banksia"
  },
  {
    value: "Coastal Gumplant",
    label: "Coastal Gumplant"
  },
  {
    value: "Coastal Plantain",
    label: "Coastal Plantain"
  },
  {
    value: "Cobweb Thistle",
    label: "Cobweb Thistle"
  },
  {
    value: "coffee fern",
    label: "coffee fern"
  },
  {
    value: "Coffeeberry",
    label: "Coffeeberry"
  },
  {
    value: "Common Blue Fescue",
    label: "Common Blue Fescue"
  },
  {
    value: "common hackberry",
    label: "common hackberry"
  },
  {
    value: "Common Knotweed",
    label: "Common Knotweed"
  },
  {
    value: "Common loosestrife",
    label: "Common loosestrife"
  },
  {
    value: "Common Myrtle",
    label: "Common Myrtle"
  },
  {
    value: "Common or Creeping Spikerush",
    label: "Common or Creeping Spikerush"
  },
  {
    value: "Common rush",
    label: "Common rush"
  },
  {
    value: "Common Sand Aster",
    label: "Common Sand Aster"
  },
  {
    value: "Common Snowberry",
    label: "Common Snowberry"
  },
  {
    value: "Common Sunshine Conebush",
    label: "Common Sunshine Conebush"
  },
  {
    value: "Common Tarweed",
    label: "Common Tarweed"
  },
  {
    value: "Common Threesquare",
    label: "Common Threesquare"
  },
  {
    value: "Compact Cobweb Thistle",
    label: "Compact Cobweb Thistle"
  },
  {
    value: "Cooper's Ice Plant",
    label: "Cooper's Ice Plant"
  },
  {
    value: "Copper Spoons",
    label: "Copper Spoons"
  },
  {
    value: "Coral Bell hybrids",
    label: "Coral Bell hybrids"
  },
  {
    value: "Coral Bells",
    label: "Coral Bells"
  },
  {
    value: "Cork Oak",
    label: "Cork Oak"
  },
  {
    value: "Corsican Hellebore",
    label: "Corsican Hellebore"
  },
  {
    value: "Cotyledon, Pigs Ears",
    label: "Cotyledon, Pigs Ears"
  },
  {
    value: "Cow Clover",
    label: "Cow Clover"
  },
  {
    value: "Cow Parsnip",
    label: "Cow Parsnip"
  },
  {
    value: "Coyote Mint",
    label: "Coyote Mint"
  },
  {
    value: "Coyotebrush",
    label: "Coyotebrush"
  },
  {
    value: "Coyotebrush prostrate form",
    label: "Coyotebrush prostrate form"
  },
  {
    value: "Cream Bush",
    label: "Cream Bush"
  },
  {
    value: "Creek monkeyflower",
    label: "Creek monkeyflower"
  },
  {
    value: "Creeping coprosma",
    label: "Creeping coprosma"
  },
  {
    value: "Creeping Mahonia",
    label: "Creeping Mahonia"
  },
  {
    value: "creeping Oregon grape",
    label: "creeping Oregon grape"
  },
  {
    value: "Creeping Sage",
    label: "Creeping Sage"
  },
  {
    value: "creeping spikerush",
    label: "creeping spikerush"
  },
  {
    value: "Creeping Thyme",
    label: "Creeping Thyme"
  },
  {
    value: "Creosote Bush",
    label: "Creosote Bush"
  },
  {
    value: "Daffodil or Narcissus",
    label: "Daffodil or Narcissus"
  },
  {
    value: "Date Palm",
    label: "Date Palm"
  },
  {
    value: "Davy's Clarkia",
    label: "Davy's Clarkia"
  },
  {
    value: "Deer Fern",
    label: "Deer Fern"
  },
  {
    value: "Deer Grass",
    label: "Deer Grass"
  },
  {
    value: "Deerweed",
    label: "Deerweed"
  },
  {
    value: "dense sedge",
    label: "dense sedge"
  },
  {
    value: "Desert Goldeneye",
    label: "Desert Goldeneye"
  },
  {
    value: "Desert Penstemon, Parry's beardtongue",
    label: "Desert Penstemon, Parry's beardtongue"
  },
  {
    value: "Desert Spoon",
    label: "Desert Spoon"
  },
  {
    value: "Desert Willow",
    label: "Desert Willow"
  },
  {
    value: "Diamond Leaf Pittosporum",
    label: "Diamond Leaf Pittosporum"
  },
  {
    value: "Distant phacelia",
    label: "Distant phacelia"
  },
  {
    value: "Ditch-carrot, Water Parsley",
    label: "Ditch-carrot, Water Parsley"
  },
  {
    value: "Dittany of Crete, Hop Marjoram",
    label: "Dittany of Crete, Hop Marjoram"
  },
  {
    value: "Dotted Smartweed",
    label: "Dotted Smartweed"
  },
  {
    value: "Douglas Fir",
    label: "Douglas Fir"
  },
  {
    value: "Douglas Iris",
    label: "Douglas Iris"
  },
  {
    value: "Drake/Sempervirens Chinese Elm",
    label: "Drake/Sempervirens Chinese Elm"
  },
  {
    value: "dune buckwheat",
    label: "dune buckwheat"
  },
  {
    value: "Dune Gilia",
    label: "Dune Gilia"
  },
  {
    value: "Dune Goldenrod",
    label: "Dune Goldenrod"
  },
  {
    value: "Dune Sagewort",
    label: "Dune Sagewort"
  },
  {
    value: "Dune Tansy",
    label: "Dune Tansy"
  },
  {
    value: "Dusty Miller",
    label: "Dusty Miller"
  },
  {
    value: "Dutchman's Pipevine",
    label: "Dutchman's Pipevine"
  },
  {
    value: "Dwarf Myrtle",
    label: "Dwarf Myrtle"
  },
  {
    value: "Dwarf Pomegranate",
    label: "Dwarf Pomegranate"
  },
  {
    value: "Dwarf Spikerush",
    label: "Dwarf Spikerush"
  },
  {
    value: "Dwarf Variegated New Zealand Flax",
    label: "Dwarf Variegated New Zealand Flax"
  },
  {
    value: "Dymondia",
    label: "Dymondia"
  },
  {
    value: "Echeveria",
    label: "Echeveria"
  },
  {
    value: "Electric Pink Grass Tree",
    label: "Electric Pink Grass Tree"
  },
  {
    value: "Elegant Brisbane Box",
    label: "Elegant Brisbane Box"
  },
  {
    value: "Elegant Madia",
    label: "Elegant Madia"
  },
  {
    value: "Emerald Carpet",
    label: "Emerald Carpet"
  },
  {
    value: "English Lavender",
    label: "English Lavender"
  },
  {
    value: "Evergreen Candy Tuft",
    label: "Evergreen Candy Tuft"
  },
  {
    value: "Evergreen Clematis",
    label: "Evergreen Clematis"
  },
  {
    value: "Evergreen Pear",
    label: "Evergreen Pear"
  },
  {
    value: "Fairy Dustre",
    label: "Fairy Dustre"
  },
  {
    value: "Fairy Wax Flower",
    label: "Fairy Wax Flower"
  },
  {
    value: "Farewell to Spring",
    label: "Farewell to Spring"
  },
  {
    value: "Feather Grass",
    label: "Feather Grass"
  },
  {
    value: "Feather Reed Grass",
    label: "Feather Reed Grass"
  },
  {
    value: "Fern Leaf Lavender",
    label: "Fern Leaf Lavender"
  },
  {
    value: "Fern Pine",
    label: "Fern Pine"
  },
  {
    value: "Fernleaf Yarrow",
    label: "Fernleaf Yarrow"
  },
  {
    value: "Fescue",
    label: "Fescue"
  },
  {
    value: "Feverfew",
    label: "Feverfew"
  },
  {
    value: "field chickweed",
    label: "field chickweed"
  },
  {
    value: "Flannel Bush",
    label: "Flannel Bush"
  },
  {
    value: "Flax Lily",
    label: "Flax Lily"
  },
  {
    value: "Foothill needlegrass",
    label: "Foothill needlegrass"
  },
  {
    value: "Fortnight Lily",
    label: "Fortnight Lily"
  },
  {
    value: "fortnight lily",
    label: "fortnight lily"
  },
  {
    value: "Franciscan Paintbrush",
    label: "Franciscan Paintbrush"
  },
  {
    value: "French Lavender",
    label: "French Lavender"
  },
  {
    value: "Fringe Cups",
    label: "Fringe Cups"
  },
  {
    value: "Frontier Hybrid Elm",
    label: "Frontier Hybrid Elm"
  },
  {
    value: "Fuchsia-flowered gooseberry",
    label: "Fuchsia-flowered gooseberry"
  },
  {
    value: "Gaillardia (Blanket Flower)",
    label: "Gaillardia (Blanket Flower)"
  },
  {
    value: "Geranium",
    label: "Geranium"
  },
  {
    value: "Germander Sage  \n Germander Sage  \n Germander Sage",
    label: "Germander Sage  \n Germander Sage  \n Germander Sage"
  },
  {
    value: "Ghost Plant",
    label: "Ghost Plant"
  },
  {
    value: "Giant chain fern",
    label: "Giant chain fern"
  },
  {
    value: "Giant Wild Rye",
    label: "Giant Wild Rye"
  },
  {
    value: "Globe Amaranth",
    label: "Globe Amaranth"
  },
  {
    value: "Globe Mallow",
    label: "Globe Mallow"
  },
  {
    value: "Gold Medallion Tree",
    label: "Gold Medallion Tree"
  },
  {
    value: "Golden Champaca",
    label: "Golden Champaca"
  },
  {
    value: "Golden Currant",
    label: "Golden Currant"
  },
  {
    value: "Golden Dock",
    label: "Golden Dock"
  },
  {
    value: "Goldenrain Tree",
    label: "Goldenrain Tree"
  },
  {
    value: "Goldenrod",
    label: "Goldenrod"
  },
  {
    value: "Goodwin Creek Lavender",
    label: "Goodwin Creek Lavender"
  },
  {
    value: "Grecian Horehound",
    label: "Grecian Horehound"
  },
  {
    value: "Green pinwheel",
    label: "Green pinwheel"
  },
  {
    value: "Green Rush",
    label: "Green Rush"
  },
  {
    value: "Green Santolina",
    label: "Green Santolina"
  },
  {
    value: "Grevillea",
    label: "Grevillea"
  },
  {
    value: "Guadalupe Palm",
    label: "Guadalupe Palm"
  },
  {
    value: "Hairy Evening Primrose",
    label: "Hairy Evening Primrose"
  },
  {
    value: "Hall's bentgrass",
    label: "Hall's bentgrass"
  },
  {
    value: "Harlequin Lotus",
    label: "Harlequin Lotus"
  },
  {
    value: "Hart's Tongue Fern",
    label: "Hart's Tongue Fern"
  },
  {
    value: "Heavenly Bamboo",
    label: "Heavenly Bamboo"
  },
  {
    value: "Hebe",
    label: "Hebe"
  },
  // {
  //   value: "Hens and Chicks",
  //   label: "Hens and Chicks"
  // },
  // {
  //   value: "Hens and Chicks",
  //   label: "Hens and Chicks"
  // },
  // {
  //   value: "Hens and Chicks",
  //   label: "Hens and Chicks"
  // },
  // {
  //   value: "Hens and Chicks",
  //   label: "Hens and Chicks"
  // },
  {
    value: "Hoary Nettle",
    label: "Hoary Nettle"
  },
  {
    value: "Holly Leaf Cherry/Islay Cherry",
    label: "Holly Leaf Cherry/Islay Cherry"
  },
  {
    value: "Holly oak",
    label: "Holly oak"
  },
  {
    value: "Hollyhock",
    label: "Hollyhock"
  },
  {
    value: "Honey Bush",
    label: "Honey Bush"
  },
  {
    value: "Hooker's Evening Primrose",
    label: "Hooker's Evening Primrose"
  },
  {
    value: "Hooker's fairy bells",
    label: "Hooker's fairy bells"
  },
  {
    value: "Hopseed Bush",
    label: "Hopseed Bush"
  },
  {
    value: "Hound's Tongue",
    label: "Hound's Tongue"
  },
  {
    value: "Houseleek",
    label: "Houseleek"
  },
  {
    value: "Huckleberry",
    label: "Huckleberry"
  },
  {
    value: "Humboldt County Fuchsia",
    label: "Humboldt County Fuchsia"
  },
  {
    value: "Hummingbird Sage",
    label: "Hummingbird Sage"
  },
  {
    value: "Hungarian oak",
    label: "Hungarian oak"
  },
  {
    value: "Idaho Fescue",
    label: "Idaho Fescue"
  },
  {
    value: "Indian hawthorn",
    label: "Indian hawthorn"
  },
  {
    value: "Indian Hawthorne",
    label: "Indian Hawthorne"
  },
  {
    value: "Indian Mallow",
    label: "Indian Mallow"
  },
  {
    value: "Indian plum,  Oso berry ",
    label: "Indian plum,  Oso berry "
  },
  {
    value: "Indian Thistle",
    label: "Indian Thistle"
  },
  {
    value: "Indigo Spires sage",
    label: "Indigo Spires sage"
  },
  {
    value: "Iris-leaved Rush",
    label: "Iris-leaved Rush"
  },
  {
    value: "Island Alum Root",
    label: "Island Alum Root"
  },
  {
    value: "Island Bush Snapdragon",
    label: "Island Bush Snapdragon"
  },
  {
    value: "Island Live Oak",
    label: "Island Live Oak"
  },
  {
    value: "Italian Arum",
    label: "Italian Arum"
  },
  {
    value: "Ithuriel's Spear",
    label: "Ithuriel's Spear"
  },
  {
    value: "Ivy Geranium",
    label: "Ivy Geranium"
  },
  {
    value: "Jacaranda",
    label: "Jacaranda"
  },
  {
    value: "Jade Plant",
    label: "Jade Plant"
  },
  {
    value: "Japanese Anemon",
    label: "Japanese Anemon"
  },
  {
    value: "Japanese barberry",
    label: "Japanese barberry"
  },
  {
    value: "Japanese Blueberry Tree",
    label: "Japanese Blueberry Tree"
  },
  {
    value: "Japanese silver grass",
    label: "Japanese silver grass"
  },
  {
    value: "Japanese zelkova",
    label: "Japanese zelkova"
  },
  {
    value: "Jerusalem Sage",
    label: "Jerusalem Sage"
  },
  {
    value: "Johnson's hybrid",
    label: "Johnson's hybrid"
  },
  {
    value: "Juareze Hens and Chicks",
    label: "Juareze Hens and Chicks"
  },
  {
    value: "June Grass",
    label: "June Grass"
  },
  {
    value: "Kangaroo Paw",
    label: "Kangaroo Paw"
  },
  {
    value: "Kangaroo Paw",
    label: "Kangaroo Paw"
  },
  {
    value: "Keith Davey Chinese Pistache",
    label: "Keith Davey Chinese Pistache"
  },
  {
    value: "Krauter Vesuvius Plum",
    label: "Krauter Vesuvius Plum"
  },
  {
    value: "Kurrajong, Bottle Tree",
    label: "Kurrajong, Bottle Tree"
  },
  {
    value: "Kwansan Japanese Flowering Cherry",
    label: "Kwansan Japanese Flowering Cherry"
  },
  {
    value: "Lady Banks Rose",
    label: "Lady Banks Rose"
  },
  {
    value: "Lake Merced brittleleaf manzanita",
    label: "Lake Merced brittleleaf manzanita"
  },
  {
    value: "Lambs ears",
    label: "Lambs ears"
  },
  {
    value: "Lanceleaf Tickseed\nTickseed",
    label: "Lanceleaf Tickseed\nTickseed"
  },
  {
    value: "Large-flower linanthus",
    label: "Large-flower linanthus"
  },
  {
    value: "Large-flower phacelia",
    label: "Large-flower phacelia"
  },
  {
    value: "Latin American fleabane",
    label: "Latin American fleabane"
  },
  {
    value: "Lavallée's hawthorn",
    label: "Lavallée's hawthorn"
  },
  {
    value: "Lavender",
    label: "Lavender"
  },
  {
    value: "Lavender Cotton",
    label: "Lavender Cotton"
  },
  {
    value: "Leafy-stemmed Coreopsis",
    label: "Leafy-stemmed Coreopsis"
  },
  {
    value: "leather leaf fern",
    label: "leather leaf fern"
  },
  {
    value: "Leather leaf sedge",
    label: "Leather leaf sedge"
  },
  {
    value: "Lemon Bottlebrush",
    label: "Lemon Bottlebrush"
  },
  {
    value: "Lemon Queen",
    label: "Lemon Queen"
  },
  {
    value: "lemon-scented gum",
    label: "lemon-scented gum"
  },
  {
    value: "Lemonade Berry",
    label: "Lemonade Berry"
  },
  {
    value: "Lemonwood, Tarata",
    label: "Lemonwood, Tarata"
  },
  {
    value: "Lenten Rose",
    label: "Lenten Rose"
  },
  {
    value: "Leucadendron",
    label: "Leucadendron"
  },
  {
    value: "Lilac Vine",
    label: "Lilac Vine"
  },
  {
    value: "Lily-of-the-Nile",
    label: "Lily-of-the-Nile"
  },
  {
    value: "Lindheimer's muhly grass",
    label: "Lindheimer's muhly grass"
  },
  {
    value: "Lion's Tail",
    label: "Lion's Tail"
  },
  {
    value: "Little Gem Magnolia",
    label: "Little Gem Magnolia"
  },
  {
    value: "Littleleaf Linden",
    label: "Littleleaf Linden"
  },
  {
    value: "Live Forever",
    label: "Live Forever"
  },
  {
    value: "Live Forever",
    label: "Live Forever"
  },
  {
    value: "Lizardtail",
    label: "Lizardtail"
  },
  {
    value: "Lombardy Poplar",
    label: "Lombardy Poplar"
  },
  {
    value: "Lomondra",
    label: "Lomondra"
  },
  {
    value: "London Plane Tree",
    label: "London Plane Tree"
  },
  {
    value: "London Plane Tree",
    label: "London Plane Tree"
  },
  {
    value: "Low Blue Blossom",
    label: "Low Blue Blossom"
  },
  {
    value: "Low Bulrush",
    label: "Low Bulrush"
  },
  {
    value: "Lupine",
    label: "Lupine"
  },
  {
    value: "Madrone",
    label: "Madrone"
  },
  {
    value: "Magenta rockrose",
    label: "Magenta rockrose"
  },
  {
    value: "Maidenhair Tree",
    label: "Maidenhair Tree"
  },
  {
    value: "Majestic Beauty/Samuel Sommer Southern Magnolia",
    label: "Majestic Beauty/Samuel Sommer Southern Magnolia"
  },
  {
    value: "Malva Rosa, Island Mallow",
    label: "Malva Rosa, Island Mallow"
  },
  {
    value: "Manzanita",
    label: "Manzanita"
  },
  {
    value: "Mardi Gras",
    label: "Mardi Gras"
  },
  {
    value: "Marina Strawberry Tree",
    label: "Marina Strawberry Tree"
  },
  {
    value: "Marsh Ragwort",
    label: "Marsh Ragwort"
  },
  {
    value: "Matilija Poppy",
    label: "Matilija Poppy"
  },
  {
    value: "Meadow Barley",
    label: "Meadow Barley"
  },
  {
    value: "Mediopicta Alba Squid",
    label: "Mediopicta Alba Squid"
  },
  {
    value: "Mediterranean Fan Palm ",
    label: "Mediterranean Fan Palm "
  },
  {
    value: "Mexican Bush Sage, Velvet Sage",
    label: "Mexican Bush Sage, Velvet Sage"
  },
  {
    value: "Mexican Evening Primrose",
    label: "Mexican Evening Primrose"
  },
  {
    value: "Mexican Fan Palm",
    label: "Mexican Fan Palm"
  },
  {
    value: "Mexican Lobelia",
    label: "Mexican Lobelia"
  },
  {
    value: "Miner's Lettuce",
    label: "Miner's Lettuce"
  },
  {
    value: "Miniature Lupine",
    label: "Miniature Lupine"
  },
  {
    value: "Mock Heather",
    label: "Mock Heather"
  },
  {
    value: "mock orange",
    label: "mock orange"
  },
  {
    value: "Molate Fescue",
    label: "Molate Fescue"
  },
  {
    value: "Monterey Indian Paintbrush",
    label: "Monterey Indian Paintbrush"
  },
  {
    value: "morning glory",
    label: "morning glory"
  },
  {
    value: "Mountain Dryad",
    label: "Mountain Dryad"
  },
  {
    value: "Mountain mahogany",
    label: "Mountain mahogany"
  },
  {
    value: "Mountain Monardella",
    label: "Mountain Monardella"
  },
  {
    value: "Mueller's Fescue",
    label: "Mueller's Fescue"
  },
  {
    value: "Mugwort",
    label: "Mugwort"
  },
  {
    value: "mule-fat",
    label: "mule-fat"
  },
  {
    value: "Munz's sage",
    label: "Munz's sage"
  },
  {
    value: "Myoporum",
    label: "Myoporum"
  },
  {
    value: "Myrtle Spurge",
    label: "Myrtle Spurge"
  },
  {
    value: "Naked Buckwheat",
    label: "Naked Buckwheat"
  },
  {
    value: "Naked Lady",
    label: "Naked Lady"
  },
  {
    value: "Narrowleaf Milkweed",
    label: "Narrowleaf Milkweed"
  },
  {
    value: "Narrowleaf Mule Ears",
    label: "Narrowleaf Mule Ears"
  },
  {
    value: "Natal Plum",
    label: "Natal Plum"
  },
  {
    value: "Native mock orange",
    label: "Native mock orange"
  },
  {
    value: "New Bradford Pear",
    label: "New Bradford Pear"
  },
  {
    value: "New Zealand Christmas tree",
    label: "New Zealand Christmas tree"
  },
  {
    value: "New Zealand Flax",
    label: "New Zealand Flax"
  },
  {
    value: "New Zealand Flax",
    label: "New Zealand Flax"
  },
  {
    value: "New Zealand Flax",
    label: "New Zealand Flax"
  },
  {
    value: "New Zealand Flax",
    label: "New Zealand Flax"
  },
  {
    value: "Nightshade",
    label: "Nightshade"
  },
  {
    value: "Nova",
    label: "Nova"
  },
  {
    value: "Olive Tree",
    label: "Olive Tree"
  },
  {
    value: "Orange Clivia",
    label: "Orange Clivia"
  },
  {
    value: "Orange Flame Poker Plant",
    label: "Orange Flame Poker Plant"
  },
  {
    value: "Orange Libertia",
    label: "Orange Libertia"
  },
  {
    value: "Oranges & Lemons",
    label: "Oranges & Lemons"
  },
  {
    value: "Oregon Ash",
    label: "Oregon Ash"
  },
  {
    value: "Pacific bleeding heart",
    label: "Pacific bleeding heart"
  },
  {
    value: "Pacific Dune Sedge",
    label: "Pacific Dune Sedge"
  },
  {
    value: "Pacific foxtail",
    label: "Pacific foxtail"
  },
  {
    value: "Pacific ninebark",
    label: "Pacific ninebark"
  },
  {
    value: "Pacific Reedgrass",
    label: "Pacific Reedgrass"
  },
  {
    value: "Pacific wild rye",
    label: "Pacific wild rye"
  },
  {
    value: "Paddle Plant",
    label: "Paddle Plant"
  },
  {
    value: "Parrot's Beak",
    label: "Parrot's Beak"
  },
  {
    value: "Passion Vine",
    label: "Passion Vine"
  },
  {
    value: "Pearly Everlasting",
    label: "Pearly Everlasting"
  },
  {
    value: "pecan",
    label: "pecan"
  },
  {
    value: "Penstemon",
    label: "Penstemon"
  },
  {
    value: "Penstemon",
    label: "Penstemon"
  },
  {
    value: "Penstemon",
    label: "Penstemon"
  },
  {
    value: "Peppermint Tree",
    label: "Peppermint Tree"
  },
  {
    value: "Persian Violet",
    label: "Persian Violet"
  },
  {
    value: "persimmon",
    label: "persimmon"
  },
  {
    value: "Peruvian Scilla",
    label: "Peruvian Scilla"
  },
  {
    value: "Pincushion flower",
    label: "Pincushion flower"
  },
  {
    value: "Pincushion Plant",
    label: "Pincushion Plant"
  },
  {
    value: "Pineneedle Beardtongue",
    label: "Pineneedle Beardtongue"
  },
  {
    value: "Pink Flowering Currant",
    label: "Pink Flowering Currant"
  },
  {
    value: "Pink Jasmine",
    label: "Pink Jasmine"
  },
  {
    value: "Pink rockrose",
    label: "Pink rockrose"
  },
  {
    value: "Pinpoint Clover",
    label: "Pinpoint Clover"
  },
  {
    value: "Pipestems; Chaparral clematis",
    label: "Pipestems; Chaparral clematis"
  },
  {
    value: "Point Reyes Ceanothus",
    label: "Point Reyes Ceanothus"
  },
  {
    value: "Poker Plant",
    label: "Poker Plant"
  },
  {
    value: "Polypody Fern",
    label: "Polypody Fern"
  },
  {
    value: "Ponytail palm",
    label: "Ponytail palm"
  },
  {
    value: "Pork and Beans",
    label: "Pork and Beans"
  },
  {
    value: "Portugal Laurel",
    label: "Portugal Laurel"
  },
  {
    value: "Pot Marigold",
    label: "Pot Marigold"
  },
  {
    value: "Potato Vine",
    label: "Potato Vine"
  },
  {
    value: "Poverty-weed",
    label: "Poverty-weed"
  },
  {
    value: "Prairie bulrush",
    label: "Prairie bulrush"
  },
  {
    value: "Prarie Plantain",
    label: "Prarie Plantain"
  },
  {
    value: "Prickly Melaleuca",
    label: "Prickly Melaleuca"
  },
  {
    value: "Pride of Madeira",
    label: "Pride of Madeira"
  },
  {
    value: "Primrose Tree",
    label: "Primrose Tree"
  },
  {
    value: "Prostrate fuschia",
    label: "Prostrate fuschia"
  },
  {
    value: "Prostrate Rosemary, Creeping Rosemary",
    label: "Prostrate Rosemary, Creeping Rosemary"
  },
  {
    value: "Purple Coneflower",
    label: "Purple Coneflower"
  },
  {
    value: "Purple Lavander",
    label: "Purple Lavander"
  },
  {
    value: "Purple Needlegrass",
    label: "Purple Needlegrass"
  },
  {
    value: "Purple Toadflax",
    label: "Purple Toadflax"
  },
  {
    value: "Purple-Leaf Acacia",
    label: "Purple-Leaf Acacia"
  },
  {
    value: "Purpletop Vervain",
    label: "Purpletop Vervain"
  },
  {
    value: "Puya",
    label: "Puya"
  },
  {
    value: "Queen Palm",
    label: "Queen Palm"
  },
  {
    value: "Radiant Bearberry",
    label: "Radiant Bearberry"
  },
  {
    value: "Ray Hartman Ceanothus",
    label: "Ray Hartman Ceanothus"
  },
  {
    value: "Red buckwheat",
    label: "Red buckwheat"
  },
  {
    value: "Red Elderberry",
    label: "Red Elderberry"
  },
  {
    value: "Red Fescue",
    label: "Red Fescue"
  },
  {
    value: "Red flowering currant",
    label: "Red flowering currant"
  },
  {
    value: "Red Flowering Gum",
    label: "Red Flowering Gum"
  },
  {
    value: "Red Horsechestnut",
    label: "Red Horsechestnut"
  },
  {
    value: "Red Hot Poker",
    label: "Red Hot Poker"
  },
  {
    value: "Red Maple",
    label: "Red Maple"
  },
  {
    value: "red monardella",
    label: "red monardella"
  },
  {
    value: "Red willow",
    label: "Red willow"
  },
  {
    value: "red-cap gum",
    label: "red-cap gum"
  },
  {
    value: "Redberry",
    label: "Redberry"
  },
  {
    value: "Redbud",
    label: "Redbud"
  },
  {
    value: "Redwood",
    label: "Redwood"
  },
  {
    value: "Redwood sorrel",
    label: "Redwood sorrel"
  },
  {
    value: "Rhodocoma",
    label: "Rhodocoma"
  },
  {
    value: "river she-oak",
    label: "river she-oak"
  },
  {
    value: "Rock Purslane",
    label: "Rock Purslane"
  },
  {
    value: "Rock rose cress",
    label: "Rock rose cress"
  },
  {
    value: "rockrose",
    label: "rockrose"
  },
  {
    value: "Rose Campion",
    label: "Rose Campion"
  },
  {
    value: "Rosea Ice Plant",
    label: "Rosea Ice Plant"
  },
  {
    value: "Rosemary",
    label: "Rosemary"
  },
  {
    value: "rough-leaved aster",
    label: "rough-leaved aster"
  },
  {
    value: "Russian Sage",
    label: "Russian Sage"
  },
  {
    value: "Sageleaf Rockrose",
    label: "Sageleaf Rockrose"
  },
  {
    value: "Salal",
    label: "Salal"
  },
  {
    value: "Salmon Texas Sage",
    label: "Salmon Texas Sage"
  },
  {
    value: "Salt marsh fleabane",
    label: "Salt marsh fleabane"
  },
  {
    value: "Salt Marsh Owl’s-clover",
    label: "Salt Marsh Owl’s-clover"
  },
  {
    value: "Salt Rush",
    label: "Salt Rush"
  },
  {
    value: "Saltgrass",
    label: "Saltgrass"
  },
  {
    value: "Salvation Jane",
    label: "Salvation Jane"
  },
  {
    value: "Salvia",
    label: "Salvia"
  },
  {
    value: "San Francisco bluegrass",
    label: "San Francisco bluegrass"
  },
  {
    value: "San Francisco coyote mint",
    label: "San Francisco coyote mint"
  },
  {
    value: "San Francisco Gumplant",
    label: "San Francisco Gumplant"
  },
  {
    value: "San Francisco leafy fleabane",
    label: "San Francisco leafy fleabane"
  },
  {
    value: "San Francisco Wallflower",
    label: "San Francisco Wallflower"
  },
  {
    value: "Sandhill sage",
    label: "Sandhill sage"
  },
  {
    value: "Santa Barbara sedge",
    label: "Santa Barbara sedge"
  },
  {
    value: "santolina",
    label: "santolina"
  },
  {
    value: "saucer Magnolia",
    label: "saucer Magnolia"
  },
  {
    value: "Scarlet Bugler",
    label: "Scarlet Bugler"
  },
  {
    value: "Scarlet Monardella",
    label: "Scarlet Monardella"
  },
  {
    value: "Scarlet monkeyflower",
    label: "Scarlet monkeyflower"
  },
  {
    value: "Scented Geranium\n  Scented Geranium",
    label: "Scented Geranium\n  Scented Geranium"
  },
  {
    value: "Scouring Rush Horsetail",
    label: "Scouring Rush Horsetail"
  },
  {
    value: "Sea Lavender",
    label: "Sea Lavender"
  },
  {
    value: "Sea Lavender",
    label: "Sea Lavender"
  },
  {
    value: "Sea Lettuce, Coast Dudleya",
    label: "Sea Lettuce, Coast Dudleya"
  },
  {
    value: "Sea milkwort",
    label: "Sea milkwort"
  },
  {
    value: "Sea Thrift",
    label: "Sea Thrift"
  },
  {
    value: "Seaside Daisy",
    label: "Seaside Daisy"
  },
  {
    value: "Seaside Daisy",
    label: "Seaside Daisy"
  },
  {
    value: "Seaside Pittosporum",
    label: "Seaside Pittosporum"
  },
  {
    value: "Seaside plantain",
    label: "Seaside plantain"
  },
  {
    value: "Self Heal",
    label: "Self Heal"
  },
  {
    value: "semaphore grass",
    label: "semaphore grass"
  },
  {
    value: "Shore Pine",
    label: "Shore Pine"
  },
  {
    value: "showy milkweed",
    label: "showy milkweed"
  },
  {
    value: "Shrubby Cinquefoil",
    label: "Shrubby Cinquefoil"
  },
  {
    value: "Sierra Plum",
    label: "Sierra Plum"
  },
  {
    value: "Silk Floss Tree",
    label: "Silk Floss Tree"
  },
  {
    value: "Silk oak",
    label: "Silk oak"
  },
  {
    value: "Silver Dollar Gum",
    label: "Silver Dollar Gum"
  },
  {
    value: "Silver Dune Lupine",
    label: "Silver Dune Lupine"
  },
  {
    value: "Silver Lupine",
    label: "Silver Lupine"
  },
  {
    value: "Silver Sage",
    label: "Silver Sage"
  },
  {
    value: "Silver Tansy",
    label: "Silver Tansy"
  },
  {
    value: "Silver yarrow",
    label: "Silver yarrow"
  },
  {
    value: "Silverweed",
    label: "Silverweed"
  },
  {
    value: "Silvery Lupine",
    label: "Silvery Lupine"
  },
  {
    value: "Skyflower",
    label: "Skyflower"
  },
  {
    value: "Slender Sunflower",
    label: "Slender Sunflower"
  },
  {
    value: "slender wheatgrass",
    label: "slender wheatgrass"
  },
  {
    value: "slough sedge",
    label: "slough sedge"
  },
  {
    value: "Small Jerusalem Sage",
    label: "Small Jerusalem Sage"
  },
  {
    value: "Smoke Bush",
    label: "Smoke Bush"
  },
  {
    value: "Smooth Goldfields",
    label: "Smooth Goldfields"
  },
  {
    value: "Sneezeweed",
    label: "Sneezeweed"
  },
  {
    value: "Snow-in-Summer",
    label: "Snow-in-Summer"
  },
  {
    value: "Snowy Thistle",
    label: "Snowy Thistle"
  },
  {
    value: "Soap Plant",
    label: "Soap Plant"
  },
  {
    value: "Soapbark Tree",
    label: "Soapbark Tree"
  },
  {
    value: "Southern Cattail",
    label: "Southern Cattail"
  },
  {
    value: "Spanish Lavender",
    label: "Spanish Lavender"
  },
  {
    value: "Spanish squill",
    label: "Spanish squill"
  },
  {
    value: "Spanish White Lavender",
    label: "Spanish White Lavender"
  },
  {
    value: "Spearmint",
    label: "Spearmint"
  },
  {
    value: "Spice Bush",
    label: "Spice Bush"
  },
  {
    value: "Spider gum, bushy yate",
    label: "Spider gum, bushy yate"
  },
  {
    value: "Spreading rush",
    label: "Spreading rush"
  },
  {
    value: "spreading wood fern",
    label: "spreading wood fern"
  },
  {
    value: "St. Mary Magnolia",
    label: "St. Mary Magnolia"
  },
  {
    value: "Stalked bulbine",
    label: "Stalked bulbine"
  },
  {
    value: "Sticky Monkeyflower",
    label: "Sticky Monkeyflower"
  },
  {
    value: "Sticky phacelia",
    label: "Sticky phacelia"
  },
  {
    value: "Stinging Nettle",
    label: "Stinging Nettle"
  },
  {
    value: "Stinging Phacelia",
    label: "Stinging Phacelia"
  },
  {
    value: "Stonecrop",
    label: "Stonecrop"
  },
  {
    value: "Stonecrop",
    label: "Stonecrop"
  },
  {
    value: "Sulphurflower buckwheat",
    label: "Sulphurflower buckwheat"
  },
  {
    value: "Sunflower",
    label: "Sunflower"
  },
  {
    value: "Sunrose",
    label: "Sunrose"
  },
  {
    value: "Sweet Bay",
    label: "Sweet Bay"
  },
  {
    value: "Sweet bay magnolia",
    label: "Sweet bay magnolia"
  },
  {
    value: "Sweet Michelia",
    label: "Sweet Michelia"
  },
  {
    value: "Sweet Pea Shrub",
    label: "Sweet Pea Shrub"
  },
  {
    value: "Sweet Sarcococca",
    label: "Sweet Sarcococca"
  },
  {
    value: "Sweetshade",
    label: "Sweetshade"
  },
  {
    value: "Switchgrass",
    label: "Switchgrass"
  },
  {
    value: "tall coastal plantain",
    label: "tall coastal plantain"
  },
  {
    value: "Tansy phacelia",
    label: "Tansy phacelia"
  },
  {
    value: "Texas Ranger",
    label: "Texas Ranger"
  },
  {
    value: "three square",
    label: "three square"
  },
  {
    value: "Thyme",
    label: "Thyme"
  },
  {
    value: "Tidytips",
    label: "Tidytips"
  },
  {
    value: "Toad Rush",
    label: "Toad Rush"
  },
  {
    value: "Tomcat Clover",
    label: "Tomcat Clover"
  },
  {
    value: "Torrey melic",
    label: "Torrey melic"
  },
  {
    value: "Toyon",
    label: "Toyon"
  },
  {
    value: "Trailing Ice Plant",
    label: "Trailing Ice Plant"
  },
  {
    value: "Trailing Lantana",
    label: "Trailing Lantana"
  },
  {
    value: "Trailing mallow",
    label: "Trailing mallow"
  },
  {
    value: "Trailing Snowberry",
    label: "Trailing Snowberry"
  },
  {
    value: "Tree aenium",
    label: "Tree aenium"
  },
  {
    value: "Tree Mallow",
    label: "Tree Mallow"
  },
  {
    value: "Trident Maple",
    label: "Trident Maple"
  },
  {
    value: "tufted fescue",
    label: "tufted fescue"
  },
  {
    value: "Tufted Hairgrass",
    label: "Tufted Hairgrass"
  },
  {
    value: "Tule",
    label: "Tule"
  },
  {
    value: "Tulip Tree",
    label: "Tulip Tree"
  },
  {
    value: "tupelo, black gum",
    label: "tupelo, black gum"
  },
  {
    value: "Turkey Tangle Fogfruit",
    label: "Turkey Tangle Fogfruit"
  },
  {
    value: "Twinberry Honeysuckle",
    label: "Twinberry Honeysuckle"
  },
  {
    value: "Valley oak",
    label: "Valley oak"
  },
  {
    value: "Varied Lupine",
    label: "Varied Lupine"
  },
  {
    value: "Victor Reiter Thyme",
    label: "Victor Reiter Thyme"
  },
  {
    value: "Victorian Box",
    label: "Victorian Box"
  },
  {
    value: "Vine maple tree",
    label: "Vine maple tree"
  },
  {
    value: "Violet-flowered Lupine",
    label: "Violet-flowered Lupine"
  },
  {
    value: "Virginia Live Oak",
    label: "Virginia Live Oak"
  },
  {
    value: "Wall Germander",
    label: "Wall Germander"
  },
  {
    value: "Washington Hawthorn",
    label: "Washington Hawthorn"
  },
  {
    value: "water birch",
    label: "water birch"
  },
  {
    value: "Water Gum",
    label: "Water Gum"
  },
  {
    value: "Water Smartweed",
    label: "Water Smartweed"
  },
  {
    value: "Wax Agave",
    label: "Wax Agave"
  },
  {
    value: "Weeping bottle brush",
    label: "Weeping bottle brush"
  },
  {
    value: "Weeping Bottlebrush",
    label: "Weeping Bottlebrush"
  },
  {
    value: "Western Chokecherry",
    label: "Western Chokecherry"
  },
  {
    value: "Western Columbine",
    label: "Western Columbine"
  },
  {
    value: "Western Dock",
    label: "Western Dock"
  },
  {
    value: "Western Goldenrod",
    label: "Western Goldenrod"
  },
  {
    value: "Western modesty",
    label: "Western modesty"
  },
  {
    value: "Western Service Berry",
    label: "Western Service Berry"
  },
  {
    value: "Western Sword Fern",
    label: "Western Sword Fern"
  },
  {
    value: "Western Vervain",
    label: "Western Vervain"
  },
  {
    value: "Western Virgin's Bower",
    label: "Western Virgin's Bower"
  },
  {
    value: "White Alder",
    label: "White Alder"
  },
  {
    value: "White Clover",
    label: "White Clover"
  },
  {
    value: "White Escallonia",
    label: "White Escallonia"
  },
  {
    value: "White mulberry",
    label: "White mulberry"
  },
  {
    value: "White Pitcher Sage, Woodbalm, Pitcher Sage",
    label: "White Pitcher Sage, Woodbalm, Pitcher Sage"
  },
  {
    value: "Whitetip Clover",
    label: "Whitetip Clover"
  },
  {
    value: "Whorled Tickseed",
    label: "Whorled Tickseed"
  },
  {
    value: "Wight's Paintbrush",
    label: "Wight's Paintbrush"
  },
  {
    value: "Wild Aster",
    label: "Wild Aster"
  },
  {
    value: "Wild Cucumber/Manroot",
    label: "Wild Cucumber/Manroot"
  },
  {
    value: "Wild Ginger",
    label: "Wild Ginger"
  },
  {
    value: "Wild Heliotrope",
    label: "Wild Heliotrope"
  },
  {
    value: "Wild Pea",
    label: "Wild Pea"
  },
  {
    value: "Willow Herb",
    label: "Willow Herb"
  },
  {
    value: "Willow Oak",
    label: "Willow Oak"
  },
  {
    value: "Wilson Elm",
    label: "Wilson Elm"
  },
  {
    value: "Winecup Clarkia",
    label: "Winecup Clarkia"
  },
  {
    value: "Winter Daphne",
    label: "Winter Daphne"
  },
  {
    value: "Wood Rose/Dwarf Rose",
    label: "Wood Rose/Dwarf Rose"
  },
  {
    value: "wood spurge",
    label: "wood spurge"
  },
  {
    value: "Woodland Brome",
    label: "Woodland Brome"
  },
  {
    value: "Woodland Clarkia",
    label: "Woodland Clarkia"
  },
  {
    value: "Woodland Strawberry",
    label: "Woodland Strawberry"
  },
  {
    value: "Woolly Blue Curls",
    label: "Woolly Blue Curls"
  },
  {
    value: "Woolly Bush",
    label: "Woolly Bush"
  },
  {
    value: "Wooly thyme",
    label: "Wooly thyme"
  },
  {
    value: "Yarrow",
    label: "Yarrow"
  },
  {
    value: "Yarrow",
    label: "Yarrow"
  },
  {
    value: "Yaupon",
    label: "Yaupon"
  },
  {
    value: "Yellow Bush Lupine",
    label: "Yellow Bush Lupine"
  },
  {
    value: "Yellow Trumpet Vine",
    label: "Yellow Trumpet Vine"
  },
  {
    value: "Yellow Willow",
    label: "Yellow Willow"
  },
  {
    value: "Yellow Willow",
    label: "Yellow Willow"
  },
  {
    value: "Yellow-eyed grass",
    label: "Yellow-eyed grass"
  },
  {
    value: "Yellow-rayed Goldfields",
    label: "Yellow-rayed Goldfields"
  },
  {
    value: "Yellow/Red Yucca",
    label: "Yellow/Red Yucca"
  },
  {
    value: "Yerba Buena",
    label: "Yerba Buena"
  }
];

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: "Search a Plant",
      term: "",
      placeholder: "Ex: Rose, Palm, California, etc.",
      results: [],
      latin_name: "",
      bloom_time: "",
      plant_type: "",
      appropriate_location: "",
      classN: "hideButton",
      classTable: "hideButton",
      searchButtonTerm: "Search",
      advancedFilterTerm: "More Filters",
      value: "",
      suggestions: [],
      selectedOption: null
    };
  }

  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    this.setState({ term: selectedOption.label });
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <Container>
        <Row className="pt-5">
          <Display4>{this.state.heading}</Display4>
        </Row>
        <Row>
          <Col>
            <Select
              value={selectedOption}
              onChange={this.handleSelectChange}
              options={options}
              className="selectClass"
            />
          </Col>
        </Row>

        <br></br>
        <Button
          variant="primary"
          className="btn-primary default-button"
          type="button"
          onSubmit={() => {
            this.handleButtonClick();
          }}
          onClick={() => {
            this.handleButtonClick();
          }}
        >
          {this.state.searchButtonTerm}
        </Button>

        {/* <Button
          variant="primary"
          className="btn-primary default-button"
          type="button"
          onSubmit={() => {
            this.handleAdvancedFilterClick();
            console.log("hello");
          }}
          onClick={() => {
            if (this.state.advancedFilterTerm === "More Filters")
              this.setState({ advancedFilterTerm: "Hide Filters" });
            else this.setState({ advancedFilterTerm: "More Filters" });

            this.handleAdvancedFilterClick();
          }}
        >
          {this.state.advancedFilterTerm}
        </Button> */}

        <Button
          variant="primary"
          className={`btn-primary default-button ${this.state.classN}`}
          onClick={() => {
            this.handleClearButtonClick();
          }}
        >
          Clear Results
        </Button>
        {/* <Row>
          <Col className="colHead">Name</Col>
          <Col className="colHead">Apt. Location</Col>
          <Col className="colHead">Bloom Time</Col>
          <Col className="colHead">Plant Type</Col>
        </Row> */}

        <Table
          className={`table-primary-1 ${this.state.classTable}`}
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>Action</th>
              <th className="head-1">Name</th>
              <th>Apt. Location</th>
              <th>Bloom Time</th>
              <th>Plant Type</th>
            </tr>
          </thead>
          <tbody>
            {this.state.results.map(result => {
              return (
                <>
                  <tr>
                    <td
                      onClick={() => {
                        this.handleAdd(result);
                      }}
                    >
                      Add
                    </td>
                    <td>{result.common_name} </td>
                    <td>{result.appropriate_location} </td>
                    <td>{result.bloom_time} </td>
                    <td>{result.plant_type} </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>

        {/* {this.state.results.map(result => {
          return (
            <>
              <Row>
                <Col>{result.common_name}</Col>
                <Col>{result.appropriate_location}</Col>
                <Col>{result.bloom_time}</Col>
                <Col> {result.plant_type}</Col>
              </Row>
            </>
          );
        })} */}
      </Container>
    );
  }

  handleAdd = result => {
    this.props.changeAddItem(result);
  };

  handleButtonClick = () => {
    const query = this.queryGenerator(this.state.term);

    //fetch response from OMDB and update state
    if (this.state.term) {
      this.setState({ searchButtonTerm: "Loading..." });

      fetch(query)
        .then(response => response.json())
        .then(response => {
          for (let i = 0; i < response.length; i++) {
            this.setState({
              results: [response[i], ...this.state.results]
            });
            if (response.length) {
              this.showClear();
              this.setState({ classTable: "showButton" });
              this.setState({ searchButtonTerm: "Search" });
            }
          }
        });
      this.setState({ heading: "Enter another plant name" });
      this.forceUpdate();

      this.setState({ placeholder: "Ex: Rose, Palm, California, etc." });
    } else {
      window.alert("Please enter a search term");
    }
  };

  addLower = term => {
    return term.charAt(0).toLowerCase() + this.state.term.slice(1);
  };
  addUpper = term => {
    return term.charAt(0).toUpperCase() + this.state.term.slice(1);
  };

  handleClearButtonClick = () => {
    this.setState({
      results: [],
      classN: "hideButton"
    });
    this.setState({ classTable: "hideButton" });
  };

  showClear = () => {
    this.setState({ classN: "showButton" });
  };

  onInputChange(term) {
    this.setState({ term });
    // this.props.onSearchTermChange(term);
  }
  queryGenerator = () => {
    //Get value from search box
    //Curate query
    var term2 = "";
    if (this.state.term.charAt(0) === this.state.term.charAt(0).toUpperCase()) {
      term2 = this.addLower(this.state.term);
    } else {
      term2 = this.addUpper(this.state.term);
    }
    const query = `https://data.sfgov.org/resource/vmnk-skih.json?$where=common_name%20like%20%27%25${this.state.term}%25%27%20OR%20common_name%20like%20%27%25${term2}%25%27`;
    // const query = `https://data.sfgov.org/resource/vmnk-skih.json?$where=common_name like '%25${this.state.term}%25' || common_name like '%25${term2}%25' `;
    // https://data.cityofchicago.org/resource/tt4n-kn4t.json?$where=job_titles like '%25CHIEF%25'
    //soda.demo.socrata.com/resource/4tka-6guv.json?$where=magnitude > 3.0
    // https: // const query =
    // "https://soda.demo.socrata.com/resource/4tka-6guv.json?$where=latin_name like aloe";

    return query;
  };

  handleAdvancedFilterClick = () => {
    if (this.state.filterShow) {
      this.setState({ filterClass: "hideButton" });
    } else {
      this.setState({ filterClass: "showButton" });
    }
  };

  searchQuery(term) {}
}
export default SearchBar;
