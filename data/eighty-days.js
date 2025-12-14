/**
 * Around the World in 80 Days - Complete Data
 * by Jules Verne
 */

const eightyDaysData = {
    title: "Around the World in 80 Days",
    author: "Jules Verne",

    sections: [
        {
            title: "The Bet",
            image: "images/80-days/summary/section-1.png",
            summary: "Phileas Fogg bets 20,000 pounds that he can travel around the entire world in just 80 days. That same night, he leaves London with his new French servant, Passepartout.",
            content: `<p>Phileas Fogg is a wealthy English gentleman who lives in London. He follows the exact same schedule every single day and never does anything surprising.</p>
                      <p>One evening at his club, Fogg reads a newspaper article saying that new trains and steamships make it possible to travel around the entire world in just 80 days. His friends don't believe it can be done.</p>
                      <p>Fogg bets them 20,000 pounds (a huge amount of money) that he can do it himself. That same night, Fogg leaves London with his new French servant, Passepartout, to prove everyone wrong.</p>`
        },
        {
            title: "The Chase Begins",
            image: "images/80-days/summary/section-2.png",
            summary: "A detective named Fix follows Fogg around the world, believing he is a bank robber. They travel through France, Italy, and Egypt before sailing to India.",
            content: `<p>A detective named Fix believes that Fogg is actually a bank robber who stole 55,000 pounds. Fix follows Fogg around the world, waiting for a warrant so he can arrest him.</p>
                      <p>First, Fogg and Passepartout travel through France and Italy. They take a steamship across the Mediterranean Sea to Egypt. Fix joins them, pretending to be a friendly traveler.</p>
                      <p>From Egypt, they sail through the Suez Canal to India. Throughout the journey, Fogg stays calm and focused, but Passepartout keeps getting into trouble.</p>`
        },
        {
            title: "Adventure in India",
            image: "images/80-days/summary/section-3.png",
            summary: "In India, Fogg buys an elephant to cross the jungle. They rescue a young woman named Aouda from being sacrificed, and she joins their journey.",
            content: `<p>In India, Fogg discovers that the train tracks aren't finished. They have to find another way to cross 50 miles of jungle. Fogg buys an elephant!</p>
                      <p>While riding through the forest, they see a group of people about to sacrifice a young woman named Aouda. She is going to be killed because her husband died.</p>
                      <p>Fogg, Passepartout, and their guide rescue her in a daring escape. Aouda joins their journey, and Fogg promises to keep her safe. They barely make it to the next train on time.</p>`
        },
        {
            title: "Trouble in Hong Kong",
            image: "images/80-days/summary/section-4.png",
            summary: "Detective Fix tricks Passepartout, causing him to miss the boat to Japan. Fogg and Aouda face a terrible storm while trying to catch up.",
            content: `<p>The group sails from India to Hong Kong. Detective Fix is getting desperate because his arrest warrant still hasn't arrived.</p>
                      <p>He tricks Passepartout and gets him drunk and drugged at an opium den. Passepartout misses the boat to Japan and gets separated from Fogg.</p>
                      <p>Meanwhile, Fogg and Aouda hire a small boat to chase after the steamer. They face a terrible storm but finally reach Shanghai just in time to catch the ship to Japan. In Japan, Fogg finds Passepartout working in a circus to earn money. They are reunited and continue their journey.</p>`
        },
        {
            title: "Crossing America",
            image: "images/80-days/summary/section-5.png",
            summary: "From Japan, they sail to San Francisco. On the train across America, they are attacked and face a broken bridge, but Fogg bravely overcomes every obstacle.",
            content: `<p>From Japan, they sail across the Pacific Ocean to San Francisco. America brings new challenges.</p>
                      <p>On the train heading east, they are attacked by Sioux warriors. Passepartout is captured, but Fogg bravely rescues him with help from soldiers.</p>
                      <p>Later, they find the train tracks blocked by a broken bridge. They convince the conductor to try crossing at full speed. The train barely makes it before the bridge collapses! When they miss their steamship in New York, Fogg buys a whole boat to cross the Atlantic Ocean.</p>`
        },
        {
            title: "The Final Race",
            image: "images/80-days/summary/section-6.png",
            summary: "Fogg's boat runs out of coal in the Atlantic. He orders the crew to burn the wooden parts of the ship. They reach London, but Fix arrests Fogg and he misses his deadline.",
            content: `<p>Fogg's boat runs out of coal in the middle of the Atlantic. He orders the crew to burn the wooden parts of the ship to keep it moving.</p>
                      <p>They finally reach Ireland and take a train to London. But Detective Fix is waiting. He arrests Fogg, thinking he is the bank robber.</p>
                      <p>Hours pass in jail before Fix learns the real thief was already caught. Fogg is released, but it's too late. He has missed his deadline by five minutes. Fogg has lost everything.</p>`
        },
        {
            title: "A Surprising Ending",
            image: "images/80-days/summary/section-7.png",
            summary: "Just when all seems lost, Passepartout discovers they gained a day by traveling east! Fogg races to his club and wins the bet with seconds to spare.",
            content: `<p>Fogg goes home, sad and broken. He tells Aouda that he lost all his money and can't take care of her anymore.</p>
                      <p>Aouda surprises him by saying she loves him and wants to marry him anyway. Fogg sends Passepartout to arrange the wedding for Monday.</p>
                      <p>But Passepartout comes running back with amazing news! Because they traveled east around the world, they gained a day by crossing the International Date Line. It's actually Saturday, not Sunday!</p>
                      <p>Fogg races to his club and arrives with just seconds to spare. He wins the bet! More importantly, he found something better than money — love and friendship. The journey around the world in 80 days changed him forever.</p>`
        }
    ],

    chapters: [
        { number: 1, title: "Phileas Fogg and Passepartout", image: "images/80-days/chapters/ch-01.png", content: "<p>We meet the mysterious Phileas Fogg, a wealthy English gentleman who lives by strict routines in London. Nobody knows much about him except that he's very rich and very precise. He hires a new French servant named Jean Passepartout, who is excited to finally have a quiet, predictable job. Little does Passepartout know that his peaceful life is about to end! Fogg seems like the most boring man in England, but something surprising is about to happen.</p>" },
        { number: 2, title: "Passepartout Is Convinced His Master Is Mad", image: "images/80-days/chapters/ch-02.png", content: "<p>Passepartout settles into his new job at Fogg's house on Savile Row. He learns about his master's incredibly precise schedule - every minute of every day is planned perfectly. Fogg eats the same meals, reads the same newspapers, and goes to the same club at exactly the same times. Passepartout thinks he has found the perfect, calm employer. But that very evening, everything changes when Fogg comes home with shocking news about a bet.</p>" },
        { number: 3, title: "A Conversation That Costs Phileas Fogg Dear", image: "images/80-days/chapters/ch-03.png", content: "<p>At the Reform Club, Fogg gets into an argument with his friends about whether it's possible to travel around the world in 80 days. A newspaper article claims new railways and steamship routes make it possible. Fogg's friends think it's impossible - there are too many things that could go wrong! But Fogg is so confident that he bets 20,000 pounds of his own money. His friends accept the bet, and Fogg announces he will leave that very night!</p>" },
        { number: 4, title: "Phileas Fogg Astounds Passepartout", image: "images/80-days/chapters/ch-04.png", content: "<p>Fogg goes home and tells Passepartout to pack a carpet-bag with some shirts and socks - they're leaving for a trip around the world in ten minutes! Passepartout can hardly believe his ears. His quiet, predictable master is about to embark on the craziest journey imaginable. They rush to catch the train from Charing Cross station at exactly 8:45 PM. Fogg brings 20,000 pounds in banknotes, and the adventure officially begins.</p>" },
        { number: 5, title: "A New Security Appears on the Stock Exchange", image: "images/80-days/chapters/ch-05.png", content: "<p>News of Fogg's bet spreads like wildfire through London. Some people bet on his success, while others bet he'll fail. The newspapers are full of articles about the journey, and \"Phileas Fogg bonds\" become a hot topic on the stock exchange. Meanwhile, a robbery at the Bank of England makes the police suspicious. The thief stole 55,000 pounds, and some detectives think Fogg might be the robber trying to escape!</p>" },
        { number: 6, title: "Detective Fix Shows Considerable Impatience", image: "images/80-days/chapters/ch-06.png", content: "<p>We meet Detective Fix, a clever police detective who has been sent to the Suez Canal in Egypt to catch the bank robber. Fix studies the description of the thief and becomes convinced that Phileas Fogg matches perfectly. He watches as Fogg's ship arrives and decides to follow this suspicious traveler. Fix sends an urgent message to London asking for an arrest warrant. He's determined to catch his man!</p>" },
        { number: 7, title: "Which Shows the Uselessness of Passports", image: "images/80-days/chapters/ch-07.png", content: "<p>Fogg and Passepartout arrive at Suez, Egypt, where passports are being checked. Detective Fix examines Fogg's passport and questions Passepartout, trying to learn more about his mysterious master. Passepartout cheerfully tells Fix everything he knows, not realizing the detective suspects them. Fix is frustrated that his arrest warrant hasn't arrived yet. He decides to follow Fogg onto the next ship heading to India.</p>" },
        { number: 8, title: "Passepartout Talks Too Much", image: "images/80-days/chapters/ch-08.png", content: "<p>On the steamship Mongolia heading to India, Fix befriends the talkative Passepartout. The French servant loves to chat and shares details about Fogg's journey and the bet. Fix pretends to be friendly while secretly gathering information. Passepartout has no idea his new \"friend\" is actually a detective. Fix becomes even more certain that Fogg is the bank robber and is just using the bet as a cover story to escape.</p>" },
        { number: 9, title: "The Red Sea and the Indian Ocean", image: "images/80-days/chapters/ch-09.png", content: "<p>The Mongolia sails through the Red Sea under a hot sun, then into the Indian Ocean. Fogg spends his time playing whist, a card game, while Passepartout enjoys exploring the ship. The ship arrives at Aden, a port city, then continues toward India. Fix stays close, watching Fogg's every move. He's frustrated that his warrant still hasn't arrived, but he won't give up the chase.</p>" },
        { number: 10, title: "Passepartout Loses His Shoes", image: "images/80-days/chapters/ch-10.png", content: "<p>The ship arrives in Bombay, India. Passepartout decides to explore the city while Fogg stays on schedule. He visits a magnificent temple but makes a terrible mistake - he enters wearing his shoes, which is forbidden! The priests are furious and attack him. Passepartout barely escapes and rushes back to find Fogg. This mishap will cause big problems later, though Passepartout doesn't know it yet.</p>" },
        { number: 11, title: "Phileas Fogg Buys a Mount", image: "images/80-days/chapters/ch-11.png", content: "<p>Fogg and Passepartout take the train across India, but there's a problem - the railway isn't finished! The tracks end in the middle of the jungle with 50 miles still to go. While other passengers panic, Fogg calmly looks for a solution. He finds a man with an elephant named Kiouni and buys the animal for an enormous sum. With a young guide named Sir Francis, they set off through the jungle on elephant-back.</p>" },
        { number: 12, title: "Passepartout and His Companions in the Forest", image: "images/80-days/chapters/ch-12.png", content: "<p>The group rides the elephant through thick jungle, crossing streams and climbing hills. The guide knows the way, and Kiouni the elephant is strong and steady. They travel through beautiful but dangerous terrain, passing by wild animals and thick vegetation. As night falls, they make camp in the forest. The journey is difficult, but they're making good progress toward the next train station.</p>" },
        { number: 13, title: "Passepartout Proves His Bravery", image: "images/80-days/chapters/ch-13.png", content: "<p>The travelers hear drums and see a strange procession through the trees. They witness a terrible sight - a young Indian woman named Aouda is about to be sacrificed because her husband died. Fogg decides they must save her, even though it could delay their journey. Passepartout comes up with a brave and clever plan. In the middle of the night, he disguises himself and rescues Aouda in a daring escape that terrifies her captors!</p>" },
        { number: 14, title: "Phileas Fogg Descends the Ganges", image: "images/80-days/chapters/ch-14.png", content: "<p>With Aouda now safely traveling with them, the group continues their journey. They reach the train station just in time. Aouda is grateful for her rescue and begins to trust her new companions. Fogg promises to take her somewhere safe. They board the train and continue across India. But the priests from Bombay have reported Passepartout, and trouble is following them.</p>" },
        { number: 15, title: "The Bag of Banknotes Is Lightened", image: "images/80-days/chapters/ch-15.png", content: "<p>In Calcutta, Fogg and Passepartout are arrested for the temple incident in Bombay! The priests have followed them and demanded justice. Fogg stays calm and pays a large bail to guarantee they'll appear in court. But they have no intention of waiting - they rush to catch their ship to Hong Kong just before it departs. Aouda joins them, and Detective Fix, still without his warrant, boards the same ship to continue his pursuit.</p>" },
        { number: 16, title: "Fix Pretends Not to Know Anything", image: "images/80-days/chapters/ch-16.png", content: "<p>On the ship Rangoon heading to Hong Kong, Fix continues to pretend he's just a friendly traveler. He chats with Passepartout but reveals nothing about his true purpose. Aouda tells Fogg about her life and how she came to be in danger. Fogg is a perfect gentleman, treating her with respect and kindness. The journey continues smoothly across the sea toward Hong Kong.</p>" },
        { number: 17, title: "Various Incidents on the Voyage", image: "images/80-days/chapters/ch-17.png", content: "<p>The ship sails through the Straits of Malacca toward Singapore. The weather is good, and the voyage is pleasant. Passepartout explores the ship and the ports they visit. Fix grows more anxious - he hopes to finally arrest Fogg in Hong Kong, which is British territory where his warrant will work. Aouda becomes more comfortable with her traveling companions and grateful for their kindness.</p>" },
        { number: 18, title: "Phileas Fogg, Passepartout, and Fix Each Minds His Business", image: "images/80-days/chapters/ch-18.png", content: "<p>Everyone on the ship has different thoughts as they approach Hong Kong. Fogg calculates their progress and remains focused on winning his bet. Passepartout worries about keeping up with the schedule and takes care of Aouda. Fix anxiously awaits his arrest warrant and plans how to delay Fogg in Hong Kong. The city finally appears on the horizon, but will Fix's warrant be waiting for him?</p>" },
        { number: 19, title: "Passepartout Takes Too Great an Interest", image: "images/80-days/chapters/ch-19.png", content: "<p>Fix's warrant still hasn't arrived in Hong Kong! He's devastated because once they leave British territory, he'll lose his chance to arrest Fogg. Desperate, Fix reveals his suspicions to Passepartout and asks for help delaying Fogg. But loyal Passepartout refuses to believe his master is a thief. Fix realizes he must take drastic action if he wants to stop Fogg from leaving Hong Kong.</p>" },
        { number: 20, title: "Fix Comes Face to Face with Phileas Fogg", image: "images/80-days/chapters/ch-20.png", content: "<p>Fix tricks Passepartout into visiting an opium den and drugs him! The poor servant becomes too confused and sleepy to warn Fogg about their ship's early departure. Meanwhile, Fogg and Aouda wait at the dock, not knowing that Passepartout has been tricked. When they learn the ship to Japan has already left, Fogg must find another way. He hires a small pilot boat to chase after the steamer.</p>" },
        { number: 21, title: "The Master of the Tankadere", image: "images/80-days/chapters/ch-21.png", content: "<p>Fogg hires a brave sailor named John Bunsby and his small boat, the Tankadere. Aouda joins them for the dangerous journey across the China Sea. Fix also manages to get aboard, still hoping to catch Fogg. The little boat sets sail toward Shanghai, where they hope to catch a larger ship to Japan. But a terrible storm is approaching, and their tiny vessel is no match for rough seas.</p>" },
        { number: 22, title: "Passepartout Finds Out He Must Have a Ticket", image: "images/80-days/chapters/ch-22.png", content: "<p>Back in Hong Kong, the drugged Passepartout wakes up confused on a ship heading to Japan! He has no money and no idea how to find his master. When he arrives in Yokohama, Japan, he's completely lost and penniless. Desperate for money, he joins a circus as an acrobat. Meanwhile, he keeps hoping that somehow Fogg will find him in this strange foreign city.</p>" },
        { number: 23, title: "Passepartout's Nose Becomes Enormous", image: "images/80-days/chapters/ch-23.png", content: "<p>Passepartout performs in a Japanese circus, wearing a costume with a long fake nose for a comedy act. During one performance, he's balancing in a human pyramid when he suddenly spots Fogg in the audience! Passepartout is so excited that he breaks free from the pyramid, causing acrobats to tumble everywhere. He rushes to his master, and they have a joyful reunion. The circus is in chaos, but the travelers are together again!</p>" },
        { number: 24, title: "Crossing the Pacific Ocean", image: "images/80-days/chapters/ch-24.png", content: "<p>The reunited group boards the steamship General Grant heading to San Francisco, America. The Pacific crossing is long - over three weeks! Aouda has grown very fond of Fogg, admiring his bravery and kindness. Passepartout finally tells Fogg about Detective Fix and his suspicions. Fogg is not worried and continues playing cards to pass the time. America awaits on the other side of the vast ocean.</p>" },
        { number: 25, title: "A Glimpse of San Francisco", image: "images/80-days/chapters/ch-25.png", content: "<p>The travelers arrive in San Francisco, California, on the American west coast. The city is bustling and wild compared to proper London! They witness a political rally that turns into a street fight, and Fogg nearly gets punched. They quickly board the transcontinental train heading east across America. The journey will take them through mountains, prairies, and deserts - but danger lies ahead on the tracks.</p>" },
        { number: 26, title: "A Ride on the Pacific Railroad", image: "images/80-days/chapters/ch-26.png", content: "<p>The train speeds across the American landscape at an impressive pace. They cross the Sierra Nevada mountains with breathtaking views. Passepartout marvels at the Wild West scenery - vast prairies, buffalo herds, and frontier towns. Fix is also on the train, still following Fogg but unable to arrest him since they're not in British territory. The group settles in for the long journey across the continent.</p>" },
        { number: 27, title: "Passepartout Attends a Mormon Sermon", image: "images/80-days/chapters/ch-27.png", content: "<p>The train stops in Salt Lake City, Utah, home of the Mormon community. Passepartout attends a Mormon lecture out of curiosity. He learns about their beliefs and customs, finding it all very interesting. The train continues through the Rocky Mountains and the vast American wilderness. Fogg stays calm and focused on the schedule, but adventures still await them on the journey east.</p>" },
        { number: 28, title: "Passepartout Cannot Make People Listen to Reason", image: "images/80-days/chapters/ch-28.png", content: "<p>The train encounters a huge herd of buffalo crossing the tracks! They must wait for hours while thousands of animals pass. Passepartout becomes frustrated with the delay, but there's nothing anyone can do. The massive herd finally moves on, and the train continues. But more problems lie ahead - they receive word that a suspension bridge ahead is damaged and might not hold the train's weight.</p>" },
        { number: 29, title: "Various Incidents on the Union Pacific", image: "images/80-days/chapters/ch-29.png", content: "<p>The train conductor decides to cross the damaged bridge at full speed, hoping momentum will carry them safely across before it collapses! Everyone holds their breath as the train races onto the bridge. Just as they reach the other side, the bridge crashes into the river behind them! It was a close call. The passengers cheer with relief, but their troubles aren't over yet.</p>" },
        { number: 30, title: "Phileas Fogg Simply Does His Duty", image: "images/80-days/chapters/ch-30.png", content: "<p>The train is attacked by Sioux warriors! In the chaos of the battle, the warriors capture several passengers including Passepartout. Fogg shows incredible bravery - he leaves the train to rescue his servant even though it might cost him the bet. With help from American soldiers at a nearby fort, Fogg leads a rescue mission. They find Passepartout and free all the captured passengers. Fogg is a true hero!</p>" },
        { number: 31, title: "Fix Renders a Service to Phileas Fogg", image: "images/80-days/chapters/ch-31.png", content: "<p>The rescue mission causes them to miss the train! They're stranded in the middle of America with the clock ticking. Surprisingly, Detective Fix helps Fogg find an unusual solution - a wind-powered sail-sled! This strange vehicle uses the prairie wind like a sailboat uses ocean wind. They zip across the frozen plains at incredible speed, racing toward Omaha to catch another train.</p>" },
        { number: 32, title: "In Which Phileas Fogg Engages in a Direct Struggle with Bad Luck", image: "images/80-days/chapters/ch-32.png", content: "<p>They reach Omaha and catch a train to Chicago, then another to New York. But when they arrive at the New York harbor, they discover that the ship to England has just left - only 45 minutes ago! Fogg searches the harbor for any vessel that could take them across the Atlantic Ocean. He finds a small trading steamer called the Henrietta heading to France. Fogg makes the captain an offer he can't refuse.</p>" },
        { number: 33, title: "Phileas Fogg Shows Himself Equal to the Occasion", image: "images/80-days/chapters/ch-33.png", content: "<p>Fogg essentially takes over the Henrietta, offering to pay a fortune to sail directly to England instead of France. When the captain resists, Fogg locks him in his cabin and takes command of the ship! The crew follows Fogg's orders, and they set sail across the Atlantic. But the ship doesn't have enough coal to reach England. What will Fogg do?</p>" },
        { number: 34, title: "Phileas Fogg at Last Reaches England", image: "images/80-days/chapters/ch-34.png", content: "<p>When the coal runs out in the middle of the Atlantic, Fogg makes a drastic decision - he buys the ship and orders the crew to burn the wooden parts to keep the engines running! They tear apart the deck, the cabins, and everything that will burn. The iron hull is all that remains when they finally reach Queenstown, Ireland. From there, they rush to catch a train to London, racing against time!</p>" },
        { number: 35, title: "Phileas Fogg Does Not Have to Repeat His Orders Twice", image: "images/80-days/chapters/ch-35.png", content: "<p>The moment they step onto English soil in Liverpool, Detective Fix finally arrests Phileas Fogg! With his warrant now valid, Fix locks Fogg in the customs house jail. Hours tick by as Fogg sits helplessly in a cell while Passepartout and Aouda wait in despair. Then suddenly, Fix bursts in with shocking news - the real bank robber was caught three days ago! Fogg is free, but has he lost the bet?</p>" },
        { number: 36, title: "Phileas Fogg's Name Is Once More at a Premium", image: "images/80-days/chapters/ch-36.png", content: "<p>Fogg punches Fix in the face for causing him to lose the bet! He rushes to catch a train to London, but arrives too late. The deadline was at 8:45 PM, and Fogg returns home five minutes past the hour. He believes he has lost everything - his fortune, his reputation, and the bet. Aouda and Passepartout are heartbroken for him. Fogg accepts his fate with quiet dignity.</p>" },
        { number: 37, title: "Phileas Fogg Gains Nothing by His Tour Except Happiness", image: "images/80-days/chapters/ch-37.png", content: "<p>The next day, Aouda tells Fogg that she loves him and asks him to marry her. Fogg is deeply moved and agrees. He sends Passepartout to arrange the wedding for Monday. But Passepartout returns with incredible news - it's not Sunday, it's Saturday! By traveling east around the world, they gained a day when crossing the International Date Line! Fogg races to the Reform Club and arrives with just seconds to spare. He wins the 20,000 pounds and, more importantly, wins Aouda's love. The journey made him a richer man in every way!</p>" }
    ],

    bookTalk: {
        title: "Around the World in 80 Days",
        published: "1872",

        author: {
            name: "Jules Verne (1828-1905)",
            bio: "Jules Verne was a French novelist known as the \"Father of Science Fiction.\" He wrote over 60 adventure novels including \"Twenty Thousand Leagues Under the Sea\" and \"Journey to the Center of the Earth.\" His imaginative stories predicted many modern inventions like submarines, helicopters, and space travel decades before they existed!"
        },

        characters: [
            {
                name: "Phileas Fogg",
                description: "A wealthy, mysterious English gentleman who lives by strict routines and schedules. He is calm, clever, and surprisingly brave when adventure calls. His bet to circle the globe in 80 days reveals that beneath his cool exterior beats a generous heart."
            },
            {
                name: "Jean Passepartout",
                description: "Fogg's loyal French servant whose name means \"goes everywhere\" in French. He is enthusiastic, talkative, and often gets into trouble, but his quick thinking and bravery save the day more than once. His loyalty to Fogg never wavers."
            },
            {
                name: "Aouda",
                description: "A beautiful and brave young Indian woman rescued from being sacrificed. She is intelligent, grateful, and courageous. As she travels with Fogg, she falls in love with the gentleman who saved her life and proved his kindness again and again."
            },
            {
                name: "Detective Fix",
                description: "A determined detective who wrongly believes Fogg is a bank robber. He follows them around the entire world, causing trouble at every turn. Though he's a nuisance throughout the journey, he's just trying to do his job as he understands it."
            }
        ],

        settingAndPlot: `<p>The story begins in London, England in 1872 and spans the entire globe - from the foggy streets of London to the jungles of India, the bustling ports of Hong Kong, the wild prairies of America, and everywhere in between. It was a time when steam power was making the world smaller, with new railways and steamship routes connecting distant lands.</p>
                        <p>When Phileas Fogg bets 20,000 pounds that he can travel around the world in just 80 days, no one believes it's possible. With his servant Passepartout, Fogg races against time using trains, steamships, an elephant, a wind-sled, and even his own determination. Along the way, they rescue a princess, escape angry priests, survive a Sioux attack, and are chased by a detective who thinks Fogg is a thief. The journey tests their courage, friendship, and faith in each other.</p>`,

        passages: [
            {
                quote: "I will bet twenty thousand pounds against anyone who wishes that I will make the tour of the world in eighty days or less.",
                explanation: "This is the bet that starts the entire adventure! Fogg is so confident in the new transportation systems of his era that he risks his entire fortune on this seemingly impossible journey."
            },
            {
                quote: "A true Englishman doesn't joke when he is talking about so serious a thing as a wager.",
                explanation: "This shows how seriously Fogg takes his bet. When his friends at the club think he's joking, he makes it clear that he means every word. His honor and word are more important than money."
            },
            {
                quote: "Phileas Fogg had won his wager. He had made his journey around the world in eighty days! He had employed every means of conveyance - steamers, railways, carriages, yachts, trading-vessels, sledges, elephants.",
                explanation: "This triumphant passage lists all the amazing ways Fogg traveled during his adventure. From modern steamships to an actual elephant, he used whatever it took to keep moving forward!"
            },
            {
                quote: "In any case, he had found a wife, which might seem to most people as if fortune had smiled upon him.",
                explanation: "The book ends by reminding us that Fogg won something more valuable than money - he found love with Aouda. The greatest treasure from his journey wasn't the bet money, but the relationships he formed along the way."
            }
        ]
    }
};
