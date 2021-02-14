import React, {Component} from 'react';

class Home extends Component{
    render(){
        return (
            <div className="container-md my-5 pt-5" id="container">
                <strong><h1>About Carbonology</h1></strong>
                <p>Although environmental problems are well-known all over the world, many people are still reluctant to reduce the carbon footprint by changing their daily habits. 
                    The main reason is that  people cannot feel how much their decision can influence the environment. 
                    Our aim is to raise people’s awareness of their impact on the environment by calculating carbon footprints from traveling and food. </p>
                <br />
                <h3>Transportation: Driving and Shipping</h3>
                <p>Cars were first invented in 1886. 
                    Since then, life has been greatly improved. 
                    People can more easily visit their friends. 
                    Goods can be more efficiently transported. 
                    However, this also brings problems when more cars are used. 
                    According to the EPA, “a typical passenger vehicle emits about 4.6 metric tons of carbon dioxide per year.” 
                    Furthermore, because online shopping is becoming more popular, carbon emission of transportation of these packages is exponentially increasing.</p>
                <br />
                <h3>Electricity</h3>
                <p>Since electricity is a clean and renewable source, some people believe it is not very important to save electricity. 
                    However, numerous power stations and electric grids can also leave carbon footprints. 
                    Indeed, people tend to notice the carbon footprint produced by vehicles,  coal burned, or other traditional carbon emission sources. 
                    We compared the footprint produced by electricity consumption with that produced by vehicles, gasoline, coal, and more. 
                    By transferring the data of electricity consumption to the data of vehicles, gasoline, etc, we are able to give users a sense of how important it is to save electricity.</p>
                <br />
                <h3>Food</h3>
                <p>Although we usually think about transportation when it comes to carbon emissions, food actually has a major impact on carbon, as we can see from this image from the EPA: 
                    <br /><img width="200px" margin-left="50px" src="https://www.epa.gov/sites/production/files/2016-05/global_emissions_sector_2015.png" />
                    <br />From this second image, we can see that our food choices have a major impact on the environment. So, the next time you eat out or go to the grocery store, consider stocking up on more vegetables, and reducing your beef and lamb intake!
                    <br /><img width="800px" margin-left="50px" src="https://ourworldindata.org/uploads/2020/02/Environmental-impact-of-food-by-life-cycle-stage-1536x1380.png" />
</p>
            </div>
        );
    }
}

export default Home;