
// // Mock data for posts
const mockPosts = [
    {
        id: 1,
        user: {
            username: 'Ashley',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWqIODNMh2fpOtfun6Spu3rkMKa-nEpAlVA&s', // Empty profilePic to simulate missing profile picture
        },
        imageUrl: 'data:image/jpeg;base64,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',
        isLiked: false,
        comments: [
            { user: 'Jennifer', text: 'Thank you for posting! You just reminded me that I did not do my meditation today. ' },
            { user: 'Lia', text: 'I need to satrt doing this. Thank you for sharing.' },
        ],
        description: 'Whenever I feel stressed, I always like to meditate. It helps me to relax and clear my mind.'
    },
    {
        id: 2,
        user: {
            username: 'Sarah',
            profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOmlcrEfYZdBUHVwXggzrQiS9gyYH_FTOogg&s', // Empty profilePic to simulate missing profile picture
        },
        imageUrl: 'https://www.betterup.com/hubfs/Google%20Drive%20Integration/Delivery%20URL%20-%20BetterUp%20-%20how%20to%20start%20journaling%20%5BARTICLE%5D-1.png',
        isLiked: false,
        comments: [
            { user: 'John', text: 'Nice!', fontWeight: "bold" },
            { user: 'Mila', text: 'This is something I want to start doing as well.' },
            { user: 'Adam', text: 'I have been journaling for years and it has helped me so much!' },
        ],
        description: 'My morning journaling. Feeling grateful.'
    },
    {
        id: 4,
        user: {
            username: 'Adam',
            profilePic: 'data:image/jpeg;base64,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', // Empty profilePic to simulate missing profile picture
        },
        imageUrl: 'https://d-mars.com/wp-content/uploads/2023/02/iStock-470643888-scaled.jpg',
        comments: [
            { user: 'John', text: 'Congratulations on winning the marathon!', fontWeight: "bold" },
            { user: 'Mike', text: 'Keeping it healthy, proud of you.' },
        ],
    },
    {
        id: 5,
        user: {
            username: 'Jessi',
            profilePic: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEBUPEBAVEBAQFRAPDw8VEA8PDxAQFRUWFhUVFRUYHSggGBolGxUVIjEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQFy0gHyUtLSstLS0tLS0uKy0tLS0rLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0rLS0tK//AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EAD4QAAEDAgMECAMGBAYDAAAAAAEAAhEDBBIhMQVBUWEGEyJxgZGhsTJCwQcUI1LR8DNyguEkYpKiwvFDstL/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQQDAgX/xAAiEQEAAwACAgMBAQEBAAAAAAAAAQIRAxIhMQQiQVFxMkL/2gAMAwEAAhEDEQA/AOv2UNfFQ3P8RS7NeBM81FXcC+QoNGr/AA/BZQC1KtQYIlZgCQHARAJgEYCqHARAJBEED0xmrwCohTCqUVYqq1S0CzTUKNtchTBpJx+izfvBTi5KYNEpBZ33kqGptRrfieBzkAKZgs3gzVaFn1OktqXYTcU8X5Q8OPopq+1KDAHPrMY12jnPa1p7iVYmP6ZK0khoV2PGJjg8HQtcHDzCOFUMkE8JINSj8CosJxq9bOBbCgdSAdKipLz4U9H4E144YU9JwwIKdH41PtDRQUD21NtBwhBmlMU5TFekCQhIRFCUAEISEZQlMAwknlJBA1GEgEQaopwSiASARgKhAIgE4aiAQMAihOAiAQCAiCeE8IBTooTwgEIXvATXNdrGlzjAGZKzeuNTMiBwO/gP17wuPLy9PXt14+Pt/intXaFR3Zp5Ngy7cOZ5fvNcltLZxINSpiqa4AZLqruDW/K3n7LsW0esMn+GwgkD/wAj9ze7X1PBWL8MoUjUqR1jgTJAim05CBx3Adw3LHN7TPlq6RHiHjZ2ZX6wVOrcxu4tpuLB3fm8JC1aNy+nUays7rGPbLS5jiDuI1BEH/pdTYdG6lxVNYtJDjIqGQfLd5rprrok19MNxAvbJaXCcyrPJGvUcM45Kz2Y6m7rbaoac6tBhvdw8CCuw2VtJz4p1hgqxllDXgbxz5eUqhZufQf1F5TDWOyZXGdP+o/L7cVe2pYGmM3djVlX5qR3Hm327krzTWd/Hjk4t8S1UlU2Xd9ayTk9hwVG8HD6b1dwr6ETExsMMxk4ZryNEnVCd6UJQqhnPJSDzxShKEApOcTqnhIhBGQhhSQmIQRkISFIQmIQREICFKQhIVEUJKSEkEICMBAEYXkGEYCAIwqowiAQhEFAQRBCE6Ak6FFTEmEDgJHJT1LeBKxOkl31dAwe0QfLT3I9VLTkasRs4z6lz94rQM6NLtEfmI08zCu1qJDcs3O+p18z6rP6PUurptDs3Oh1Q6SQNPP6LapOlzqh+CkMuZ1J55+wXzrTMzst9YyD2dABzaf5Rjf3n9/7VWFo27uGuqdplIuqYD8Jc6MEjk2PEuVum0im55+N+Z4jF2QPKfJF0e+Ev/MTHduUmXTjjZ1tsp5QBACJ1JPSrZaJ31FcjF22qF5Ra9pY8SCsy0kMfbPM9UAaZO+kco8PqtWq7NY+0KhbXpu3Ox03dxEj1AXN0tXasCncfdrlrtKdSKNUcHD4HeUjyXXtMiVyW17bGDzEc5H1yHmtHonfmpRwOMup9nvA0Wz49/8Ay+dzV/W5CZIplqZiSSTKhJJJkChCiQlAxQkIihKASEJCIoSgGEk6SAKduSifRI1WjbuBEDVR9US+CpqqvUGJTALWe3skRoswjNNDAIgE4RAIhk8IgEoQCrFrTJKihW7OpBhFW7imS2AuF6Uz1rWESAWud/K3E4+f1Xf1qkCVwvS2sMbnaSGtH1XDlnKuvFH2Z1jdOe8NGjde/T3ldABLW0G6EhzuMagd85rnNkNwsxb3EkeH7911uwqGRqvymczrG/285WLWyUl5lhZvJDo3QMh7FVtjXlKnQZ1lRrSRME596r7V2hArV9era6I3PMNYwc8x6rzO+6Vi3DaDaBqVADkOG8nLhmrFZtPh7paKxOvYB0lswcP3hknISSM/FWvvrXCWuBB0IzBXg1G5u634ps4tw5rXvDT2C4mMjnGR3fRes9F7GoGYHZbwRMEHgres1euO1beYa11esptL6jg1o1ccguY2n0ss3RgqYi0gyGkgbtfFY/2jOruItqTC+YwtAlz3mYaB3Aleddbc0aTyaPYEY3BrobPHL10zyVpxTaNTk5orOPX6rw4GO8fv96Kp0ZqBl4aenWAkD9+PkqGxb/rrenVB+UT3gQ5WLw9XUp3LNaTg882zDmqcdutnG9dh3jqajIVhpmDMggEdxTvE6L6TAqpKZ1JB1ZREaZSGmUhTKCNMVIWFDCCMpijIQkIAIQqQhCQgYUykpG1IEJIYlo1GjNSsuhMrJCkBUxWpTuwZVSpEqEIgVcQYCIIQUQKAkkydA6mtviChRsMGUGnefD4Ly/pRdl1QDeTIB4wSPofBd7tXaMUXDiMPgcj6SvMr93WV2PPw4nE90D+6y88/jTwx+uhs6ROCmJBIBeeDdSTwnLzW5d3pFM06ZDGtE1Kh+Gm0bzPAAmOWeWKOcdtBtJhq1HBpf2iTo1u4AfRcB0v6WVLhnVMmnatc2Wz2qzhniqHvA7PdruzUpN7Y0WnrGvSNkXlO5eKVHO2owQ45ms/Ptu9T/VOpXSV+j9u4h3VNxjIPDQHDx1XB/ZXUigXE6uIXpVC9AHFT1aWrr9IyFO32KxrpxTGgjJXqeTssgMgs+vtxvW9WwY36lrc4HE8AmG2KMia7AT8he0OHhqkyRQFy1v3gYmg4hrAMHio7/ozRq/GA5pzLSHFp3yRME84Wb0h6Q21Os2bhodhcWtkEudIgHvzWxQ2uxzdYO8bwmzB1iXKdILNlkwFkMpbsuy3keSz6N42owtnIjIbweCu/aDtGm61qUyRJaSORAyK8s6O7QqMET2RED9Fa0ma6580xW0Q936N3fWWzJOdP8J3e3T0hbNE5Lh/s9vMfWjcRTeO84gfZdjK38U7SHzOSMtMLTDAzTtcM1UxJsS948LjQEznCVUxlNiVwW3Qqj9U2MppTEMUJTkoSgRQlOSgJQOkmSQVwjCYIwFQ4RBMAiAQEE4TAJwgcIkKdFEEUoU4RGN0oeRRhubiRHmB9VyNpTmmX88u4j+y7LbTZAykAH2J+gWBs+1JoFkZhkDjIGqw88/aWzhj6uL2y+pcVsInAwExuyICo7a2C9lo5xBJYynW/3hru/wCKfBdx0X2aDcUw8TixNdPCCfoV01/sdrmGi8S3C+m8bzSqAgxz1jmFzpfrMO167GOL+zl/+FEHfK1+kO0q1NmGgMbnTA3+W9ct0Ne61q1bCtlUpOJadz2HRzeRyPivRdlUWOcMbARMsJAOF24jgV5vGWlo4rbSGB0c6U2dqzq67n0rh/bqmpSqte93GS0ZeitbVZse7a572sbVdrcMbTbVDhvxayuov7TFGJrSW5tJaHAcxOipVnNaDjpU5ggvNKnUGYAPAjQbyvVeq9ZmPWvL3Wey7R5qG4ddPBlpeBLSNIAKvWW0al69rqDX06TJxV3nA2BqAPm3BanSGxoVo/CY4CA0MpspsERElsk907yr9u5ltaVKjmgBsMZIGEOAyDRykL1aYz+y89ZrP5DzzpGaj6hoh2N5/DGurskLdmNpVBRxYiwl1R26eA8fZXejTuuuKtyc20MwdxqunM92vgoNrBzahDAcT4J5CQD44jHgvXn/AJZrWiZ16F9m9rhp1am4ubTH9IJPq70XYlZnRmy6m1YzQ5ud/M4yfdaZWukZWIYrztpkySeEy9vBkydMqGSTpkAlMURQlAJQlEUJQCkkkgFjZ0U3VEblZ2bTESVNUqicMLzqqTKZO5OWxqtSA1swqFzVBOSCIBEAhCIKoUJ0koQJOEoRsZKCnfN7JPAH1WJsp4bUc12m7m10/p6hbu0aZwOHET6LjqtSK44nGwdxDSPVp9Vg5v8AqWvin6tllHBVDm/K7G3nvI9/NdDtAZ4x8Lhjad5kS5o5iMQ/q4rKtHB1EnV9NzDxlpe1p9ytDP7u9nzUvxGTrDSDh/8AYeKytGuH6YbEbWLbqjlXpDCXDU05kHnGY7iodhdIjTIo3HZJ+B/yu5g/RWLy9NK7LB/DfJaOGeXmHQh2rshlamcssz/I79F738l1r49O82dtBlVoEiQrNexpuEkLwlu1LqyfLHl7GkjMzEbit22+1DKHscHcIDmnuzkL3FZ/1e0f3Hod7YUm9qBDc89AvGum/Sd1d33Wiew1ztN7iU/Snp7cV2mmw9Ww5E/MQua6PW5fVgCS7Cxp34nPGngHLtx8eR2sz83Ls9avR/s92KW2hxCOsrN8YGR91dttjipdY9xqhp4CmwuA8zB8Oa62jRbSpGmBApOoDxLRPlKo2/Zdh34iR4aLjF9trxauVx0tNkNGWUJ4V22cHUg4bxnyO9V6BGLNfRidhilEWpg1XLtzTop6NIBslXRmFqbAtHsuMBHVwtTRkkJQjrETkgVQxQFGUJVAoSESEoBSSSRGrbARkmhs81Fs74VXJ/EXh6ar4jPRZ1yBOSt3Z7CzQUgEAiAQgowV61DwnhOESgCFPRagAU9JqKjr05BnkPdcTtPZ56xjhqHRO+RP0LvRd49mR8Vz1WC9+LRsOng7NY+f+tHDKG0YWipwLcMdxldFXpAdzw5v+ppIWLdN7JjvI/yljh+q1a1bE1kbsLj5R+ixtPt5v0gY4VCQC4sY0t5lmGR35Fb1uM4G8Zc4/sQp9t2HYa8Dji4w4GT5kInUSHMdxIHm0D3Vl0rLndvbLDmkjQ6HhO7uXm9/YYHkRHLcvZLmniaQPLc4HguH25YlxIAlw+HLMhe63x7tXXn93TJIaNXEBdh9nOy5uKLiJioe7sh3/wBLKuNnGnUYXDMOAc3hiGnevS+i+zRb9S4jNratR2XAR/xXW/J9Ihn6faZdLeMlrx+d7mzwMDCfQeaoVLUkYtHZTycOHI5rZuQNOLg4d+n/ABSeG5OnI5Ecf7rLuLMeF7Yb5YWndB8x+quCg0qls5kY+QZn5qS1JxL6nF5qwX9p324BVnCIVe+3KU/AvbyGlSaDklcUwdVWs3HEi2gTuV/RRrCDkgRFMvSBKEoimKaYBE+nAlMVOYLQE0xEKQST4eaSmiTZ9QBqrl/4iqtcRonCYNe7qjAs4FBjKcKxBqUORByiBTgpiJw5EHKAFLEk+Fjz6WQ9SMqwqrWOPL1U9OnGuazX+TWPXlrp8S8+Z8JKt0AJJgLlr69tn1A03LaTnfCx7uqc907g+J3LrmtB3KjtrZdG4oPoV2B9N4IIOoO5wO4jiuF+Xv7h3r8eKed1mWZnUzDerJ17QzHoVcp1e2BucyB/Tr7hYFG/o0rinYNJgsAxEyW4eywknedANdFtsol2RGFzCSOR4dxEeBWeYVoXNuC2Doez4HT6Ki6jDmMdu6syeILR7j1RWF9rRqiHCWgHR7eXHLNT1KckTq34HfmbIMHmIHlKuEMo0My0ETL8IkTrpHkp7bZ7X6jPeYzHJW2W5PaOp1HPelRplpMEg78zBUaocrtPok77x1kA0+sY47ogDz0Ks7U2hgqUaTQMxVp6aueC1g/1D1XUVs43kmJOZz5rmNsbPxVqVQCere136HwKfrneoKm0SKDXuBlrWkie1kB6w33Uzb5rm9Y12TwMxo7hI/cINo2sjL5i4xuIgEe0+a5/ZLX0waL8oJDeeQJI8VYj9cZ/jueht+X9ZQcc6cEccJ3LdbSDXLz3oxVd11R4JaYa0c4JkLrKN+SYfkdx3FbOC8RHWWbl4rT9obF85HiGBZr3k6pjVOkrV1ZtWLM9pHtEqk15GiT6hOquIElNKRQyrgclAU5KElMQiUMpFCUwPKSCUkwQhSAKMFG0qKkATgIQ5GCgUJ0gUi7xO4JNsjZWsTacgzjCltqBJk6+wR0Leczqr9GnC+fzc08k5Hp9Pg4I4o2fZqVFSPpIw6FHUqhcsjHXZmUQMFV9pOOGG5k+QHFPUqp2ZlRZ8uJ6XdDalSgLu2JF7bOFdokxVjMtI0JiY7yN62+iXSild0WPcA2o5uCo3e2oBJaeeeXIhdbRbkvNdvbGbYX5u8WGzuy0PYA44bvEBTIjQGTJ08wukea4z2iItrrdsWzHhrtHAjMZZHf4ET4BR7NuHS6jUzNMxPHg7v8A3vWfVvC4BoM/D5TmrLapNQPA1xlxI3Rl6wuX699fDYpHjxQPp5qK2qE+Q9hKuFqT5dqTkK1Zhw5aiCO8ZrMrPxOgZGHeBwn9Fs1GmFTqUROLfr4rzL37Yd/WIDQB8Abi45CD6GVnXJY4tqEgNl3bJjDLRPmB5rU2lSDmwMnt+E6Ym/lP6/qubv7DHTfTd8LwJYR2mOGYI5a5c1ayz3pP419nMa09nPGccjQjvWlWdvXB9Ebh9CqbGpP4f4luT81EntN/pPou3eZC6W8StJ8NXZtxjZJ1acJ8FZhY2wKvbqM/lcPY/RbS+jxW7UiXzOWvW8wEpJ5TLo5hKYokJQCUJRFMUQBQlEUJQCkkkgrhGCpBbmJS6gqaYEFGCnpUSdEqow5lNMM98d50CtWdvvOpVazp4jiPgOAWvSavnc3LPJOR6fW4OGOOuz7HTYpCYQ4lE+ouTr7KrUVWq/mgrV1XdVU1cSjVX7SnvVOzbiWqxsIk+EzFX2rs5lxRdQqCWvEbpB1BHMGD4KcKRq6w4S8x6FOdTvauy713+IoAvtn7rm33GTq4D6/lK9ArUBhgALlvtT2I59uNpW7uru9nTcU6kxipNzew8RAmO8bytfon0jo7Qtm16RbjhvX0QZdRqRm0jWJmDvCt67HaCl8nrK1b2xGqsuCMhA4rk77qElZ945waS1pcfyhzW78zJ4CStF6p135ry9KtW2Dh3aFRmnuIB5q1aUsLAzEXwMnOeXvIk/E45k96asxSVhyHS/ZJwNuqA/xFsetpx87fnpnk5shW9mbQbVYyowyyq0PYeR1HeNFq3QyXB7OvmW14+xcYa94r22WTcc42chIJHeV0r9oz+Odvrbf67HZzsNyP84c3x1HsuhK5S6qYKjH8HNPhOa6srb8afrj5/wAqv20yaU6YrTrKYlCnTJoYoSiQlNAlCSiJQEoGlJKUkEnWHDkPVSU3zGSSSikxxbIAVa4caj4jJvqU6Sz/ACJ+rV8SIm/n8aFtSgKwSkksOPozKJ9QqncVzwSSXrE1kXV0R+wq1hemo4iCGtOemaSSdXntOunsDkFpMckkvMQsykBUrSmSXSIcbS86+2zbFRtq2xog47o4qrpAigwg4ZJGbnR4NM6rxrZLry2qivbF1Gq3IPa6nmN4cCYcMhkZCdJbeOI6sPJM9nsXQ77RTXLaF7R6mu4hrKrIfRqOOgLQS5hPiOYXeuBSSWbm44ifDX8fktaPKvWlZpBLkklwxq09vSIrE4ndprSGdnCMJIJGU54hOfyiIzm9Uo5aJJJMJ2lnXVA8PZeY/aZsx4fRuqTfxGOwzLRp2mnXcQfNJJe+GPvDnzztJatO+dXt2VcOEmMTZBwvBzE7816my1EDuHskktfFGTMQxc09orMkbQIPugSSXZwR1rWBKokHgnSVhJCQUJB4JJKoEg8EDp4JJKgQD+4SSSUH/9k=', // Empty profilePic to simulate missing profile picture
        },
        imageUrl: 'https://mirandaschroeder.com/wp-content/uploads/2019/02/Neverletyourfeardecideyourfate7CMotivational2Cinspiringquotesforyourphonescreenbackground7CMirandaSchroederBlog.png',
        isLiked: false,
        comments: [
            { user: 'John', text: 'Beautiful', fontWeight: "bold" },
            { user: 'Mike', text: 'So pretty' },
            { user: 'Adam', text: 'Love thiss' },
        ],
    },
    {
        id: 7,
        user: {
            username: 'Tom',
            profilePic: 'data:image/jpeg;base64,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', // Empty profilePic to simulate missing profile picture
        },
        text: 'Be the change that you wish to see in the world.   -Mahatma Gandhi',
        imageUrl: null,
        isLiked: false,
        comments: [
            { user: 'John', text: 'Beautiful', fontWeight: "bold" },
            { user: 'Mike', text: 'So pretty' },
            { user: 'Adam', text: 'Love thiss' },
        ],
    },
];
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Modal, Pressable, TextInput, Animated, TouchableWithoutFeedback, FlatList } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { API_URL, ACCESS_TOKEN } from '../constants';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    // const [showCommentsModal, setShowCommentsModal] = useState(false);
    // const [selectedPost, setSelectedPost] = useState(null);
    // const [commentText, setCommentText] = useState('');
    const [activeTab, setActiveTab] = useState('ForYou');
    const [showFullScreenImage, setShowFullScreenImage] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    // const [animations, setAnimations] = useState({});
    // const lastPressRef = useRef(0);
    const [currentUserProfilePic, setCurrentUserProfilePic] = useState('https://via.placeholder.com/150');

    useEffect(() => {
        setPosts(mockPosts); // Assuming mockPosts is defined elsewhere
        setCurrentUserProfilePic('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTroSOiSqh5acX6IE2p04232ISBtkG5xREnjQ&s');
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${API_URL}/posts`, {
                    headers: {
                        'Authorization': `Bearer ${ACCESS_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    // To handle the like functionality, you can use the following code:
    // const handleLike = async (postId) => {
    //     try {
    //         const updatedPosts = posts.map((post) =>
    //             post.id === postId ? { ...post, isLiked: !post.isLiked } : post
    //         );
    //         setPosts(updatedPosts);
    
    //         await fetch(`${API_URL}/posts/${postId}/like`, {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': `Bearer ${ACCESS_TOKEN}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ isLiked: !updatedPosts.find(post => post.id === postId).isLiked }),
    //         });
    //     } catch (error) {
    //         console.error('Error liking post:', error);
    //     }
    // };

// To handle the favorite functionality, you can use the following code:
    // const handleFavorite = async (postId) => {
    //     try {
    //         const updatedPosts = posts.map((post) =>
    //             post.id === postId ? { ...post, isFavorited: !post.isFavorited } : post
    //         );
    //         setPosts(updatedPosts);
    
    //         await fetch(`${API_URL}/posts/${postId}/favorite`, {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': `Bearer ${ACCESS_TOKEN}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ isFavorited: !updatedPosts.find(post => post.id === postId).isFavorited }),
    //         });
    //     } catch (error) {
    //         console.error('Error favoriting post:', error);
    //     }
    // };

    const openFullScreenImage = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
        setShowFullScreenImage(true);
    };

    const closeFullScreenImage = () => {
        setShowFullScreenImage(false);
        setSelectedImageUrl('');
    };

    const onGestureEvent = (event) => {
        if (event.nativeEvent.translationY > 100) {
            closeFullScreenImage();
        }
    };

    // Handle double tap to like
    // const handlePress = (postId) => {
    //     handleLike(postId);

    //     if (!animations[postId]) {
    //         const scaleAnim = new Animated.Value(1);
    //         setAnimations(prev => ({ ...prev, [postId]: scaleAnim }));

    //         Animated.sequence([
    //             Animated.timing(scaleAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
    //             Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
    //         ]).start();
    //     } else {
    //         Animated.sequence([
    //             Animated.timing(animations[postId], { toValue: 1.2, duration: 100, useNativeDriver: true }),
    //             Animated.spring(animations[postId], { toValue: 1, friction: 3, useNativeDriver: true }),
    //         ]).start();
    //     }
    // };

    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
            <View style={styles.profileOverlayContainer}>
                <Image
                    source={{ uri: item.user.profilePic || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTroSOiSqh5acX6IE2p04232ISBtkG5xREnjQ&s' }}
                    style={styles.overlayProfilePic}
                />
                <Text style={styles.overlayUsername}>{item.user.username}</Text>
            </View>
            {item.imageUrl ? (
                <Pressable onPress={() => openFullScreenImage(item.imageUrl)}>
                    <Image 
                        source={{ uri: item.imageUrl }} 
                        style={styles.postImage} 
                        resizeMode="cover"
                    />
                </Pressable>
            ) : (
                <View style={[styles.textPostContainer, { flex: 1 }]}>
                    <Text style={styles.textPostContent}>{item.text}</Text>
                </View>
            )}
        </View>
    );

    const handleTabPress = (tab) => {
        setActiveTab(tab);
    };

    const handleAddPost = () => {
        console.log('Add post functionality');
    };

    const handleProfilePress = () => {
        console.log('Profile button pressed');
    };

    const handleSearchPress = () => {
        console.log('Search button pressed');
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabsContainer}>
                <Pressable
                    style={[styles.tab, activeTab === 'Following' && styles.activeTab]}
                    onPress={() => handleTabPress('Following')}
                >
                    <Text style={styles.tabText}>Following</Text>
                </Pressable>
                <Pressable
                    style={[styles.tab, activeTab === 'ForYou' && styles.activeTab]}
                    onPress={() => handleTabPress('ForYou')}
                >
                    <Text style={styles.tabText}>For You</Text>
                </Pressable>
                <Pressable
                    style={[styles.tab, activeTab === 'Favorites' && styles.activeTab]}
                    onPress={() => handleTabPress('Favorites')}
                >
                    <Text style={styles.tabText}>Favorites</Text>
                </Pressable>
            </View>
            {activeTab === 'ForYou' && (
                <View style={styles.overlay}>
                    <FlatList
                        data={posts}
                        renderItem={renderPost}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.columnWrapper}
                    />
                    <Modal
                        visible={showFullScreenImage}
                        transparent={true}
                        onRequestClose={closeFullScreenImage}
                    >
                        <PanGestureHandler onGestureEvent={onGestureEvent}>
                            <View style={styles.fullScreenImageContainer}>
                                <TouchableWithoutFeedback onPress={closeFullScreenImage}>
                                    <Image
                                        source={{ uri: selectedImageUrl }}
                                        style={styles.fullScreenImage}
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                        </PanGestureHandler>
                    </Modal>
                </View>
            )}
            {activeTab === 'Following' && (
                <View style={styles.tabContent}>
                    <Text>Following Content</Text>
                </View>
            )}
            {activeTab === 'Favorites' && (
                <View style={styles.tabContent}>
                    <Text>Favorites Content</Text>
                </View>
            )}
            <View style={styles.bottomNavigationBar}>
                <Pressable onPress={handleSearchPress}>
                    <FontAwesome name="search" size={25} />
                </Pressable>

                <Pressable onPress={handleAddPost} style={styles.addPostButton}>
                    <FontAwesome name="plus" size={25} />
                </Pressable>

                <Pressable onPress={handleProfilePress}>
                    <Image
                        source={{ uri: currentUserProfilePic }}
                        style={styles.profilePic}
                    />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingTop: 2,
        paddingBottom: 1,
        zIndex: 10,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    tabText: {
        color: 'black',
        fontSize: 16,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#BFAC98',
    },
    overlay: {
        padding: 3,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginHorizontal: -10,
        marginTop: -7,
        marginLeft: -5,
    },
    postContainer: {
        flex: 1,
        margin: 5,
        overflow: 'hidden',
    },
    textPostContainer: {
        padding: 20,
        backgroundColor: '#1c1c1c',
        width: '100%',
        minHeight: 250,
        maxHeight: 250,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    textPostContent: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    profileOverlayContainer: {
        position: 'absolute',
        top: 5,
        left: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 3,
        zIndex: 1,
    },
    overlayProfilePic: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 8,
    },
    overlayUsername: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    postImage: {
        width: '100%',
        height: 250,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 7,
        marginBottom: 6,
    },
    commentsLink: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '50%',
        backgroundColor: '#1c1c1c',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: 10,
    },
    modalHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    divider: {
        height: 1,
        backgroundColor: '#333333',
        width: '100%',
        marginVertical: 10,
    },
    commentsScrollView: {
        flex: 1,
    },
    commentContainer: {
        padding: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#1c1c1c',
    },
    commentText: {
        color: '#FFFFFF',
    },
    commentUsername: {
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    commentInput: {
        flex: 1,
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#333333',
        color: '#FFFFFF',
    },
    addCommentButton: {
        marginLeft: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },
    addCommentButtonText: {
        color: '#000000',
        fontWeight: 'bold',
    },
    closeModalButton: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    closeModalButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    fullScreenImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    fullScreenImage: {
        width: '90%',
        height: '80%',
    },
    tabContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomNavigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        bottom: 1,
        width: '100%',
        height: 50,
    },
    addPostButton: {
        backgroundColor: '#FFFFFF',
        padding: 7,
        borderRadius: 30,
        position: 'absolute',
        bottom: 5,
        left: '50%',
        zIndex: 1,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 19,
        borderColor: '#FFFFFF',
    },
});


export default HomePage;
