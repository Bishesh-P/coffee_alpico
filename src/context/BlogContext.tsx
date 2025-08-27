import React, { createContext, useContext, useState, useEffect } from 'react';
import { BlogContextType, BlogPost } from '../types';

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Sample blog posts
const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Pour-Over Coffee: A Complete Guide',
    excerpt: 'Discover the secrets behind brewing the perfect pour-over coffee, from bean selection to water temperature.',
    content: `# The Art of Pour-Over Coffee: A Complete Guide

Pour-over coffee has become increasingly popular among coffee enthusiasts, and for good reason. This brewing method allows for complete control over the extraction process, resulting in a clean, flavorful cup that highlights the unique characteristics of your chosen beans.

## What You'll Need

- **Coffee beans**: Freshly roasted, preferably within 2-4 weeks of roast date
- **Grinder**: A burr grinder for consistent particle size
- **Pour-over dripper**: V60, Chemex, or Kalita Wave
- **Filters**: Appropriate for your dripper
- **Gooseneck kettle**: For precise water control
- **Scale**: Digital scale for accuracy
- **Timer**: To track brewing time

## The Perfect Ratio

A good starting point is a **1:16 ratio** of coffee to water. For example:
- 25g coffee : 400g water
- 30g coffee : 480g water

## Step-by-Step Process

### 1. Heat Your Water
Heat water to **200-205°F (93-96°C)**. If you don't have a thermometer, bring water to a boil and let it sit for 30 seconds.

### 2. Grind Your Coffee
Grind your coffee to a **medium-fine consistency**, similar to table salt. The grind size may need adjustment based on your taste preferences.

### 3. Rinse the Filter
Place the filter in your dripper and rinse with hot water. This removes any papery taste and preheats your brewing vessel.

### 4. Add Coffee and Bloom
Add your ground coffee to the filter and create a small well in the center. Start your timer and pour twice the weight of water as coffee (e.g., 50g water for 25g coffee) in a circular motion. Let it bloom for 30-45 seconds.

### 5. Continue Pouring
After the bloom, continue pouring in slow, circular motions, keeping the water level consistent. Aim to finish pouring by 2:30-3:00 minutes.

### 6. Enjoy
Your total brew time should be around 4-6 minutes. Taste and adjust your grind size, ratio, or technique for future brews.

## Pro Tips

- **Consistency is key**: Use the same technique each time to identify what works best
- **Water quality matters**: Use filtered water for the best taste
- **Experiment**: Try different beans, ratios, and techniques to find your perfect cup
- **Take notes**: Keep track of what works and what doesn't

## Common Mistakes to Avoid

1. **Using stale beans**: Coffee is best within 2-4 weeks of roasting
2. **Inconsistent grind**: Invest in a good burr grinder
3. **Wrong water temperature**: Too hot can over-extract, too cool can under-extract
4. **Rushing the process**: Take your time and enjoy the ritual

Pour-over coffee is as much about the journey as the destination. With practice and patience, you'll be brewing café-quality coffee at home in no time!`,
    author: 'James Wilson',
    publishedAt: '2024-01-15',
    tags: ['brewing', 'pour-over', 'guide', 'technique'],
    featured: true,
    image: 'https://www.pexels.com/photo/a-glass-and-a-coffee-dripper-27915657/',
    readTime: 8
  },
  {
    id: '2',
    title: 'Understanding Coffee Origins: From Farm to Cup',
    excerpt: 'Explore how geography, climate, and processing methods influence the flavor profile of your favorite coffee.',
    content: `# Understanding Coffee Origins: From Farm to Cup

The journey of coffee from farm to cup is a fascinating process that significantly impacts the flavor profile of your morning brew. Understanding coffee origins can help you make more informed choices and appreciate the complexity behind each sip.

## The Coffee Belt

Coffee grows in a band around the equator known as the "Coffee Belt," roughly between 25°N and 30°S latitude. This region provides the ideal conditions for coffee cultivation:

- **Altitude**: 1,000-2,000+ meters above sea level
- **Temperature**: 60-70°F (15-24°C)
- **Rainfall**: 60-70 inches annually
- **Soil**: Rich, volcanic soil with good drainage

## Major Coffee Regions

### Central America
**Characteristics**: Bright acidity, medium body, citrus and chocolate notes

**Notable Origins:**
- **Guatemala**: Full-bodied with spicy and smoky notes
- **Costa Rica**: Clean, bright, with citrus and honey flavors
- **Honduras**: Balanced with caramel and fruit notes

### South America
**Characteristics**: Nutty, chocolatey, well-balanced

**Notable Origins:**
- **Colombia**: Medium body with caramel sweetness
- **Brazil**: Low acidity, nutty, chocolatey
- **Peru**: Mild, smooth, with subtle fruit notes

### Africa
**Characteristics**: Bright, fruity, floral, wine-like

**Notable Origins:**
- **Ethiopia**: Birthplace of coffee, complex floral and fruit notes
- **Kenya**: Bright acidity with black currant flavors
- **Rwanda**: Clean, bright, with citrus and floral notes

### Asia-Pacific
**Characteristics**: Full-bodied, earthy, herbal

**Notable Origins:**
- **Indonesia**: Full-bodied, earthy, low acidity
- **Papua New Guinea**: Rich, full-bodied with fruit notes
- **Yemen**: Wine-like, complex, with fruit and spice notes

## Processing Methods

The way coffee is processed after harvesting greatly affects its flavor:

### Washed (Wet) Process
- **Result**: Clean, bright, acidic
- **Process**: Fruit removed before drying
- **Common in**: Central America, East Africa

### Natural (Dry) Process
- **Result**: Fruity, sweet, full-bodied
- **Process**: Dried with fruit intact
- **Common in**: Ethiopia, Brazil

### Honey Process
- **Result**: Balanced sweetness and acidity
- **Process**: Partial fruit removal before drying
- **Common in**: Central America

## Factors Affecting Flavor

### Altitude
Higher altitudes generally produce:
- Denser beans
- More complex flavors
- Higher acidity
- Slower maturation

### Soil Composition
- **Volcanic soil**: Mineral complexity
- **Clay soil**: Full body
- **Sandy soil**: Lighter body

### Climate
- **Rainfall patterns**: Affect cherry development
- **Temperature variations**: Influence flavor development
- **Humidity**: Affects drying process

## Terroir in Coffee

Like wine, coffee expresses terroir - the complete natural environment in which it's grown:

- **Microclimate**: Local weather patterns
- **Soil minerals**: Contribute to flavor complexity
- **Surrounding vegetation**: Can influence taste
- **Farming practices**: Organic vs. conventional

## How to Taste Origin Characteristics

When cupping different origins:

1. **Smell the dry grounds**: Note initial aromas
2. **Taste at different temperatures**: Flavors change as coffee cools
3. **Note the body**: Light, medium, or full
4. **Identify acidity**: Bright, mild, or low
5. **Look for unique flavors**: Fruit, floral, nutty, chocolatey

## Seasonal Considerations

Coffee is seasonal, with harvest times varying by region:

- **Central America**: October - March
- **South America**: April - September
- **Africa**: October - February
- **Asia**: October - March

For the freshest coffee, buy beans that were recently harvested in their respective seasons.

Understanding coffee origins enhances your appreciation for this complex beverage and helps you discover new favorites based on your taste preferences!`,
    author: 'Elena Martinez',
    publishedAt: '2024-01-10',
    tags: ['origins', 'geography', 'flavor', 'education'],
    featured: true,
    image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    readTime: 12
  },
  {
    id: '3',
    title: 'Sustainable Coffee: Our Commitment to Ethical Sourcing',
    excerpt: 'Learn about our direct trade relationships and how we support coffee farming communities worldwide.',
    content: `# Sustainable Coffee: Our Commitment to Ethical Sourcing

At Alpico Coffee, sustainability isn't just a buzzword—it's the foundation of everything we do. From our direct trade relationships to our environmental initiatives, we're committed to creating a positive impact throughout the coffee supply chain.

## What is Sustainable Coffee?

Sustainable coffee encompasses three key pillars:

### Environmental Sustainability
- **Biodiversity preservation**: Protecting ecosystems where coffee grows
- **Water conservation**: Minimizing water usage in processing
- **Soil health**: Maintaining fertile soil for future generations
- **Carbon footprint reduction**: Minimizing environmental impact

### Social Sustainability
- **Fair wages**: Ensuring farmers receive fair compensation
- **Community development**: Supporting education and infrastructure
- **Gender equality**: Promoting women's participation in coffee farming
- **Worker rights**: Ensuring safe working conditions

### Economic Sustainability
- **Long-term partnerships**: Building lasting relationships with farmers
- **Price stability**: Providing predictable income for farmers
- **Quality premiums**: Rewarding excellence in coffee production
- **Market access**: Helping farmers reach specialty coffee markets

## Our Direct Trade Program

We work directly with coffee farmers and cooperatives, cutting out middlemen to ensure:

### Better Prices for Farmers
- Pay **20-40% above Fair Trade prices**
- Provide harvest financing when needed
- Offer long-term contracts for price stability

### Quality Improvement
- Provide technical assistance and training
- Share cupping feedback to improve quality
- Invest in processing equipment upgrades

### Transparency
- Visit farms annually
- Share farmer stories with our customers
- Provide traceability for every bag of coffee

## Environmental Initiatives

### Shade-Grown Coffee
We prioritize shade-grown coffee because it:
- Preserves bird habitats
- Maintains biodiversity
- Reduces need for chemical inputs
- Produces better-tasting coffee

### Water Conservation
Our partner farms use:
- **Eco-pulpers**: Reduce water usage by 80%
- **Wastewater treatment**: Prevent contamination
- **Rainwater harvesting**: Reduce dependence on groundwater

### Organic Practices
We support farmers transitioning to organic methods:
- Provide organic certification assistance
- Share composting and natural pest control techniques
- Pay premiums for organic coffee

## Community Impact

### Education Programs
- **Scholarship funds**: Supporting farmers' children
- **Agricultural training**: Teaching sustainable farming methods
- **Business skills**: Helping farmers manage finances

### Infrastructure Development
- **Clean water projects**: Installing water filtration systems
- **Road improvements**: Better access to markets
- **Healthcare facilities**: Supporting rural health clinics

### Women's Empowerment
- **Women's cooperatives**: Supporting female coffee farmers
- **Leadership training**: Developing women leaders
- **Microfinance**: Providing access to credit

## Certifications We Support

### Fair Trade
- Ensures minimum prices for farmers
- Provides community development premiums
- Promotes democratic organization

### Rainforest Alliance
- Protects biodiversity and ecosystems
- Improves farmer livelihoods
- Promotes sustainable agriculture

### Organic
- Prohibits synthetic pesticides and fertilizers
- Protects soil and water quality
- Supports biodiversity

## Our Carbon Neutral Commitment

We're working toward carbon neutrality through:

### Emission Reduction
- **Renewable energy**: Solar panels at our roastery
- **Efficient roasting**: Modern, low-emission equipment
- **Local sourcing**: Reducing transportation emissions

### Carbon Offsetting
- **Reforestation projects**: Planting trees in coffee regions
- **Renewable energy**: Supporting clean energy projects
- **Methane capture**: Funding biogas projects

## How You Can Help

### Choose Sustainable Coffee
- Look for certifications (Fair Trade, Organic, Rainforest Alliance)
- Support direct trade coffee
- Buy from roasters committed to sustainability

### Reduce Waste
- Use reusable cups and filters
- Compost coffee grounds
- Buy only what you'll use fresh

### Spread Awareness
- Share information about sustainable coffee
- Support businesses with ethical practices
- Educate others about the impact of their choices

## Measuring Our Impact

We track our sustainability efforts through:

### Annual Impact Reports
- Farmer income improvements
- Environmental metrics
- Community project outcomes

### Third-Party Audits
- Independent verification of our claims
- Continuous improvement recommendations
- Transparency in our operations

### Customer Feedback
- Regular surveys on sustainability priorities
- Suggestions for new initiatives
- Partnership opportunities

## The Future of Sustainable Coffee

Climate change poses significant challenges to coffee farming:

### Adaptation Strategies
- **Climate-resistant varieties**: Developing new coffee cultivars
- **Altitude migration**: Moving farms to higher elevations
- **Diversification**: Encouraging crop diversity

### Technology Solutions
- **Precision agriculture**: Using data to optimize farming
- **Water-efficient processing**: New methods to reduce water use
- **Renewable energy**: Solar drying and processing

### Collaborative Efforts
- **Industry partnerships**: Working with other roasters
- **Research funding**: Supporting agricultural research
- **Policy advocacy**: Promoting sustainable practices

## Join Our Mission

Every cup of Alpico coffee you enjoy supports our sustainability mission. Together, we can ensure that coffee farming remains viable for future generations while protecting the environments and communities that make great coffee possible.

**Learn more about our specific partnerships and impact at [our sustainability page](#).**`,
    author: 'David Chen',
    publishedAt: '2024-01-05',
    tags: ['sustainability', 'ethics', 'direct-trade', 'environment'],
    featured: false,
    image: 'https://images.pexels.com/photos/1093312/pexels-photo-1093312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    readTime: 15
  }
];

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const savedPosts = localStorage.getItem('blog-posts');
    return savedPosts ? JSON.parse(savedPosts) : samplePosts;
  });

  useEffect(() => {
    localStorage.setItem('blog-posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (postData: Omit<BlogPost, 'id' | 'publishedAt'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString().split('T')[0]
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: string, updates: Partial<BlogPost>) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updates } : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const getPost = (id: string) => {
    return posts.find(post => post.id === id);
  };

  const getFeaturedPosts = () => {
    return posts.filter(post => post.featured);
  };

  return (
    <BlogContext.Provider value={{
      posts,
      addPost,
      updatePost,
      deletePost,
      getPost,
      getFeaturedPosts
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
