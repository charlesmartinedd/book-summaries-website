/**
 * A Christmas Carol - Complete Data
 * by Charles Dickens
 */

const christmasCarolData = {
    title: "A Christmas Carol",
    author: "Charles Dickens",

    staves: [
        {
            title: "Stave 1: Marley's Ghost",
            image: "images/christmas-carol/stave-1.png",
            summary: "Ebenezer Scrooge is a mean, greedy old man who hates Christmas. He refuses to give money to the poor and won't even let his clerk, Bob Cratchit, have a warm fire at work.",
            content: `<p>Ebenezer Scrooge is a mean, greedy old man who hates Christmas. He refuses to give money to the poor and won't even let his clerk, Bob Cratchit, have a warm fire at work.</p>
                      <p>On Christmas Eve, something strange happens. The ghost of his dead business partner, Jacob Marley, appears at Scrooge's door. Marley is wrapped in heavy chains made of money boxes and keys.</p>
                      <p>He warns Scrooge that he will suffer the same fate unless he changes his ways. Marley tells Scrooge that three spirits will visit him that night.</p>`
        },
        {
            title: "Stave 2: The Ghost of Christmas Past",
            image: "images/christmas-carol/stave-2.png",
            summary: "The first spirit looks like a strange child with a bright light shining from its head. This ghost takes Scrooge back in time to see his own past.",
            content: `<p>The first spirit looks like a strange child with a bright light shining from its head. This ghost takes Scrooge back in time to see his own past.</p>
                      <p>Scrooge sees himself as a lonely boy left alone at school during Christmas. He also sees happier times when he worked for a kind boss named Mr. Fezziwig.</p>
                      <p>The saddest memory is when his fiancée, Belle, breaks up with him because he loves money more than her. Scrooge becomes very upset and begs the ghost to take him home.</p>`
        },
        {
            title: "Stave 3: The Ghost of Christmas Present",
            image: "images/christmas-carol/stave-3.png",
            summary: "The second spirit is a giant dressed in a green robe, surrounded by a huge feast. This ghost shows Scrooge how people celebrate Christmas right now.",
            content: `<p>The second spirit is a giant dressed in a green robe, surrounded by a huge feast. This ghost shows Scrooge how people celebrate Christmas right now.</p>
                      <p>They visit Bob Cratchit's home, where Scrooge meets Tiny Tim, Bob's sick little son who walks with a crutch. The ghost warns that Tiny Tim will die if things don't change.</p>
                      <p>They also visit Scrooge's nephew Fred's Christmas party, where everyone is having fun. Before leaving, the ghost shows Scrooge two scary children named Ignorance and Want, who represent the problems caused by greed.</p>`
        },
        {
            title: "Stave 4: The Ghost of Christmas Yet to Come",
            image: "images/christmas-carol/stave-4.png",
            summary: "The third spirit is the scariest of all. It wears a black hood and never speaks. This ghost shows Scrooge the future.",
            content: `<p>The third spirit is the scariest of all. It wears a black hood and never speaks. This ghost shows Scrooge the future.</p>
                      <p>Scrooge sees people talking about a dead man that nobody liked or misses. Thieves steal the dead man's belongings, and no one comes to his funeral.</p>
                      <p>Scrooge also sees the Cratchit family crying because Tiny Tim has died. Finally, the ghost takes Scrooge to a graveyard and points to a tombstone. The name on it is EBENEZER SCROOGE.</p>
                      <p>Terrified, Scrooge promises to change.</p>`
        },
        {
            title: "Stave 5: The End of It",
            image: "images/christmas-carol/stave-5.png",
            summary: "Scrooge wakes up on Christmas morning a completely different person. He is so happy to be alive!",
            content: `<p>Scrooge wakes up on Christmas morning a completely different person. He is so happy to be alive!</p>
                      <p>He buys the biggest turkey in town and sends it to the Cratchit family. He gives money to the poor and goes to his nephew's Christmas party.</p>
                      <p>The next day, he gives Bob Cratchit a raise and promises to help his family. Scrooge becomes like a second father to Tiny Tim, who does not die.</p>
                      <p>From that day on, Scrooge keeps the spirit of Christmas in his heart all year long.</p>`
        }
    ],

    bookTalk: {
        title: "A Christmas Carol",
        published: "1843",

        author: {
            name: "Charles Dickens (1812-1870)",
            bio: "Charles Dickens was one of the greatest writers of the Victorian era. He wrote famous novels like \"Oliver Twist\" and \"Great Expectations.\" Many of his stories focused on the struggles of poor people, especially children, and helped change how society treated the less fortunate."
        },

        characters: [
            {
                name: "Ebenezer Scrooge",
                description: "A cold, greedy old businessman who hates Christmas and refuses to help anyone. Through his encounters with three ghosts, he learns to open his heart and becomes one of the kindest men in London."
            },
            {
                name: "Bob Cratchit",
                description: "Scrooge's underpaid clerk who remains cheerful and kind despite his difficult life. He works hard to support his large family and is a devoted father who loves his children deeply."
            },
            {
                name: "Tiny Tim",
                description: "Bob's youngest son who is sick and walks with a crutch. Despite his illness, he has a cheerful spirit and famous words \"God bless us, every one!\" His fate depends on whether Scrooge changes his ways."
            },
            {
                name: "Jacob Marley",
                description: "Scrooge's dead business partner who appears as a ghost wrapped in chains made of greed. He warns Scrooge that three spirits will visit him to help save his soul from the same terrible fate."
            }
        ],

        settingAndPlot: `<p>The story takes place in London, England during the Victorian era, around the 1840s. The cold, foggy streets of London at Christmas time create a perfect backdrop for this tale of transformation.</p>
                        <p>On Christmas Eve, grumpy Ebenezer Scrooge receives a supernatural warning from his dead partner's ghost. That night, three spirits show him visions of his past, present, and future. When Scrooge sees what his life has become and where it's heading, he makes a dramatic decision to change his ways and embrace the spirit of Christmas. The story teaches us that it's never too late to become a better person.</p>`,

        passages: [
            {
                quote: "Bah! Humbug!",
                explanation: "This is Scrooge's famous catchphrase at the beginning of the story. \"Humbug\" was his way of saying Christmas is nonsense and not worth celebrating. He used it to dismiss anyone who tried to spread holiday cheer."
            },
            {
                quote: "I will honour Christmas in my heart, and try to keep it all the year. I will live in the Past, the Present, and the Future.",
                explanation: "After seeing the terrible future that awaits him, Scrooge makes this promise to the Ghost of Christmas Yet to Come. He vows to learn from his past mistakes, appreciate the present, and work to create a better future."
            },
            {
                quote: "God bless us, every one!",
                explanation: "These famous words are spoken by Tiny Tim at the Cratchit family's Christmas dinner. Even though his family is poor and he is sick, Tim's words show his grateful and loving spirit. This line has become one of the most quoted phrases from any Christmas story."
            },
            {
                quote: "I am as light as a feather, I am as happy as an angel, I am as merry as a schoolboy!",
                explanation: "Scrooge says this joyfully when he wakes up on Christmas morning, knowing he has a second chance at life. These words show the complete transformation from the bitter, angry man he was to someone full of joy and gratitude."
            }
        ]
    }
};
