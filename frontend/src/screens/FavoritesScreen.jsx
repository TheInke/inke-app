import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, SafeAreaView, TouchableOpacity, Modal, FlatList, Animated, PanResponder, TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');

const mockFavoritePosts = [
  {
      id: 1,
      user: {
          username: 'John Doe',
          profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      imageUrl: 'https://picsum.photos/id/1/300/300',
      description: 'This is my decription of my post. Feel free to comment down below wha you think!',
      comments: [
          { id: 1, username: 'user1', text: 'Great post!', profilePic: 'https://randomuser.me/api/portraits/women/1.jpg' },
          { id: 2, username: 'user2', text: 'Love it!', profilePic: 'https://randomuser.me/api/portraits/men/2.jpg' },
          { id: 3, username: 'user3', text: 'Amazing!', profilePic: 'https://randomuser.me/api/portraits/women/2.jpg' },
      ],
  },
  {
      id: 2,
      user: {
          username: 'Jane Smith',
          profilePic: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
      imageUrl: 'https://picsum.photos/id/2/300/300',
      description: 'Another great post I liked.',
      comments: [
          { id: 4, username: 'user4', text: 'Nice shot!', profilePic: 'https://randomuser.me/api/portraits/men/3.jpg' },
          { id: 5, username: 'user5', text: 'Wonderful!', profilePic: 'https://randomuser.me/api/portraits/women/3.jpg' },
      ],
  },
  {
    id: 3,
    user: {
        username: 'Ashley',
        profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWqIODNMh2fpOtfun6Spu3rkMKa-nEpAlVA&s',
    },
    imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTExIVFRUXGBgYFRUWFxYVFxUVFxcXGBUVFRUYHiggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0lHR0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYBBwj/xABFEAABAgMFBAgEBAUCBAcBAAABAAIDESEEBRIxQVFhcYEGEyIykaGxwUJy0fAHFFKCI2KSwuEzohVTstIlQ1Rzg5PiFv/EABkBAAMBAQEAAAAAAAAAAAAAAAACAwEEBf/EACIRAAICAgICAwEBAAAAAAAAAAABAhEDMRIhBFETMkEiYf/aAAwDAQACEQMRAD8AsQTVZrpCf4r+XotFBNVmr9P8V/H2XGjqZQZpzVuH8PJVG6cCrbPh4BMTYQs/dRO7xkhln7oRSwac0yFkFIAQy35lE4HshduzKZioju4Z/eq2vRttCsXduR5eq23R1wDSd6VGtGwsEOivKhdsYEK8SrR0Kxr3gZkDioX2+GA5xe0Bner3eIQHpDbjUB0huXn9va5xMgUrnRqjZu7x6d2OGcJc91AZsaHAgjKZPqqVn/EGxudKZZ8wmDOdCROUvDevLbzgvZ3mkTQWI6v3sWfYaqPocX5ZbTDf1cRr5A503AiYynSaodD6xXmY7kjL5gvF7Jb8Iq0uAkKOw0OdBwFd2um9/DG9HCLEBxPDmZAUaQctjefss3K2bVRGXKP/ABKP/wC/G916hdf+mOJWAuiCx9vMSHVkRz3nbNwFN2a9DsjA1shlMp4CzJ0kkk4gkkkkAJJJJACSSSQAkkkkAeIwTVZm+z/Ef830Wkg5rM32e275iuNbOqRUblyKuNzHBUm5cvdXRmOHsnECEHuhFbv04IVC7oRSwey1CSCsHVCLec0WgmhQO8H95MzInbufQ8vVaWx2/BDMts+UxvWQsETsnkrVqtcmho/mOtAPJKObq579wuzmfrwRu231IZryexW/CR9fNFLXe1JTW2xaC94W/G7NcgSms5YoznnskT3o1dEdz4nVESeMwo5GdWCPVhG23VDjQy1zRMih2HReT3rZDCiOhuzB8QvVbFGiviGGIjQQcsGKXmFjPxJsuGIyJITIIJGRl6LMMqdex80LV+jLQIswjvRi+DZI3WCbtwIkRMGRnw8Qss18vHJX4cao10kuo4z2bodHbFtDnF1akCmpzBAqt5CyXkf4Z2giIWYwyYyAaXOoDQngdD7r1qzd0VnvRje0ZNEqSSSoTEkkkgBJJJIASSSSAEkkkgDw6Dmszfh/iO4rSQc1mL7P8R3Fca2dUis3LkPVXh3vvYqLMhy9VdHeKcmEWZBFLB7IU3IIrYfYLULIIwjQ8EAvF3eR5ndKzl5uoUzFRDYXdk8QuXhFwhtSSDNtKATqSduSjsTuzzC5bYZLS4k0nSYlhJoGjMmlRvCX9HRSh2mqfGt29CXRj/jyr4KKJGVEjGzY3bCcQHB5bIaLQ9CGl0dzqmmeZKyF326UGe4f5RnojaGhzjJxDhhdq0s1HGq5p32d2NJpJGztNzN68xGOc15zwmXiNqB/iPdkrJiJM2FpmakzOGRO+a0vWQiWdW4B7RRlasGhB0E81n/xWjn8mATLFEYD5n1AUo/ZDTf8nkUN1QrrXzMhLbuyy8QhpNVZgPIMqSXczgRsOilpMOKx7ZFzSDLszdTugGhmKZzr4e5XXb3RYbXtaBiBJBJoRKYnxK8K6I42WiE9rWu7QaQW4hImRoSJn0zXu92wQ2oJLTOQ2Zbgljs2eiw20ulMsPdxUINNlZVTvzbdQ4UnUHLbRNaez+z2XX5O+T6qhIkbaGH4h6eqkBUERve4N9SmOs7ZuoO82ops2LbAtpKoIeUnOHaOs6SNK8F0F9O1OhNQNJSyltRZhaSVfrXjQGg2jPxXH2rCCS00MqSPNFgWUkO/4xD2P/pKSOSN4s8bgmqy18O7buK00ErK3o7tniuWOzpkNh/DyVxuZVOFm3krbcymJhIZBFrD9EIRaw5eC2Iki+09lyzN6GhWln2HLLXo6hTMVENiPY5hHbwsfWWaFDbIOfMzqXCQOTRWRrMjZvWfsR7HMLf3JZ5w4bpmjRQAesppR0ePW0Fj3Mdm0lpE5yLSQQDrqoYwIAmDXLfwWgtlyRHWh+NjoYLi4zmSQXVDSAQ5xLgBodwKoQLJEixWzOFrXNxvq4Q5uoXSmGzMzvkU/JGNCuu1yGAkT03jNbTom2tIjm1BkDSfBYa9YI/MRSwjA19JyBcCZAgamdTLejFzRHh4AcZFSyq10dfjyd0z2Z72hsyRPafqvLPxO6QNjOhwWGbWTe5wyL5YWgbQJu8VtXWMGGJzJlqSV5N0th4bSRpIepUMNORXOqgC4YnX74K8yHrLeN/3VVmQqyNNu7bz+i03Rm5DaA8HE0MY55INZNFZDmuts4kar8MpCKYbxOHFGETExiE9dDspXReu2RkgANjvZeUfhrADYodQkAyyMjICdKA1l47V6tYjMcneoWwX6Zk9D2dz/wCMeic/J3yD+5cI7J+T2K7Eyd8n/cnJjn/FwHukcz8zf7Un/FwHukdfmb/atAQzHzO9HLmz5XeoXWafM70K4NPld6hYAjrwZ6lciiY/d7Lv0Z6rpH/V7IAE4ElYkkkoezxiCVlbwPaPErSQXzCy9uPaPFRiVkTQs28vRWWZn71VWCe0PvRWYRr4JhGEyi9jyQbVGLH3VsRJF0/6bllL0PZPFal5/huWTvU9k8UzFQyydwcQvS+jo/gw/lC80s3cbxXptwmUFk6DCKnLJKMVr5ujrIjqY8bCcI77Q0fDOkjoDTEZ10y93dGSyCBWJHiEnqZhgdCL+rmZ5Sm4iICMJ0diAPoES94EM4icUxLsDEScpYhTxKxV99MmvEP8tDMKKwuAjOwl2AuDsLZEiRIFCNAQQsY8LbpGP6Z2HqbW5omZhszEDQ8kzmQGiWGc6681duGFMtdsNVW/4RFiP61xLy4zc9zpucdpJqVqLjuwwsbnd0ywjWY3KWSaqjuw4nF2zVWSMHskNi8w6ZWN35icpiu/OmvOq39yRngP7NSaTyA0Ct/kXxTIhg31KhCXF2VyQTTTPMIl3tDGPaHFuTgSHFsiZEuAaJSkJylRbz8OLG+HaXHqXOmGyiTADWktNRmaUltRd/RJhBMR7SMzNtBLWeKiIXPEZYoPWkzmMeQmIZIEJgBrM0pPMldWOdvs4c0VFdd2A+heAR3NZse48S5vhmV6TYe6ODvULzTorChwopijGAQWhpk7DMgjtUnKUsl6HZrYwNAJ0NZGszRUxyTWyeWEk+0XT3T8n1XYvxfL/wBygdamSPaHdA51pxUj47e12h3QM9a0VLI0Sv8Ai/auO1+Zv9q49w7Vf0rp1+Yf2rQONzHzu9HLgyHyu9l1mY+Z39yWn7T7IATvZnqnjPmfQpp1/Z6pwz5n0K0AfNJR4kklm0fMnRi9H9Z1WbTM/KprUe1zVTozHhQw5znjG6gGoCntBrzU2uyifRbgntD70VmBnzCpwD2vFW7Me0OKwGE9UZsndCC6ozZu6E0Sci3FP8MrJXqeyeK1Uf8A0ysleppzTGIUJ8obTvRaxl8bD1jiQAJN+EbABlzQSD2sDNBU8UZfaRDadwXNlb0j0PGxpLkzTXcxps7AP+ZEb/vd9Fh7NZS6TiOS091x8Fks5OeIxTwL3n+4qtBseAlp0yO1vwuG4iSJ/wApE/HqWSRHD7shSQz2b1sG3Y1sAPNHAtBkS4HstxSnlV01j75lDhADOI4N4DM+nmvQ2QpwolQQ4ktEqtwybI75sH9SlVo7Jypg5kZrBMptjjkunoqMV6sWZ3gojtBuNC64CEfjMnfIKv8AETH7gqnSsY2yGr5/thiQHifJGbqgFoxuEnESA/S3ZxOZ5bEJvir2jcfHE6fsuppwx/6zgjJTzr0gFdhwuIOS3dzWgZbQfGSwwcDyJHMGR9Fo7njUClilxkdWeHKJrnsEnUHcHuuRrOztdkZA5ChrXiu4ptJ/kH9yfF+L5R7r0TySB1iZXsyqMqcU02JuhcJOGTjqB9c1afrxb7LjtfmHoFtILKcGxEZRH952ZnLOtdV3qIkqRD3DmBumrbNPmd/cmnL9h9llBZAWRa9ppq3TSdAkHRgcmmp1I4Ky7Xi31C63PmVtBYB7exJd/MbklK0Vp+j5Ns4k5vEI9HdUcVnYB7beIR+KajimnsWOi7APa8Vdsh7Q4ofZz2ir1jPaHFIaEwaozZz2QgYNUbgHstWxEZZtR/h81kr0y5rV2w/wwsleBoOK1hFW0iS6W1JUF+R8IGyasWQSaqkKxfnLVBs0yBEfJxGYYAXPI34WmW+S54q5HqTfHGGrHapw2A/C1o5ASRGBbpCRAc3QGhHA5hA4ELq8bCSSx72TOZwOLZnfROfGkunijx22naCdpjMixbMwTA60Ezkdi9BuyI1zooE+zFiDdmA7zHmvKbki4rZB+dvmvT7hZhdaAHTlHinf23ud7rlyJKVI9PDKTx29g6zXFExEvitz+EE+ZktHd9gYyRzIyJ04BCjHcIzmnIGY4Gv3wRuyuVMcY7o482bI24tl9gQPpO3A0RdGu7XyvkD/ALg3xKOw1Tv+ydbBcz9QlLKc6SVZw5KieOfCSl6PJLBfJdEibMb5cMRW46P2ma89vGE2HFkw4mtJZjoMZB70hSteQWo6OWqoXFkjxfR6+OfyQ7PVLDEmwjdL1+qtRHjtV0Hugt0R502ovhG1d2N8opnmZY8ZMkc4Vrq32SP9w9FEWhN6vgqEidmnzO9XJpy/YVCYa5gRQFl2vFvqF1przKrV2poEjMZ1HiigsEYF1XfyLv1+SSjwZXmj4/gd9vEI7ENRxQOz99vFG3mo4pp7FjotQHVKv2E9oIZAOaI2A9pIaE2mqNwTRqAtNUchmg4JkKyxbj2Aslixv3DJHOktpwQmtGbqDhr9OaB3e1JkfR1eNjt2y69smop+F9gx2mNaDlDbgb876u5hrf8Aeg1ujABejdEbCLLZGh5DSZviOJAAc7aTsAA5KeNFfKl1Rl+mtl6q0FwADYox0/UOy+YlSZE+c1lLRaFrOnd6QbR1QgxMZZiDpNOHtYTMPPe7ukxXNZey2QTm8TB8t6v8iSOOPjzmyfolDLrVCP8AMD4L0Doza5W21Qz8TyRxz91jrkDYEZr3GTRr/jauWa+yy1mOAQC+cjsoK8gFztObbR2pxxxUW9no97Qi14foRI7th81bu+Pkgwv+HHkWkGVZbSrcK1wyZsOB2rTTwCWGTi+yWXxXLuJqYLppXhCJhv2NY905ykQ0lp8fRB7NemHvtMtrfoVffeTHwrQA4f6TsIJk4nC+YAPAeK6o5Iy0zleGcdo8kslj6yBHIFYbGxB+1wDv9pcpuj8eqL9AYIe+Mx2ToWFw3OMistZ3GBGfCf3mOLTxBlPyXPkjcTu8eVTo9YuqPQFaZsecivP7jt4IEitpY3zbwW+NL8F8uH6XxEBTiFUK4HkZLrs4C3JcULbTtUgiArbA7NLEu4VzCtA7iXU2SSAPjWyjtt4oy89ocUHsnfbxRZx7QUp7HjosWc5ojd5qhdmOaJXealKzQiw1R1py4IBCNQjjDUJkIwFftqxxiNGdkcfi85+CjbEIFJIZHeS9x2uJ8SpWPUZI9DE6VFtk8QdOoMxka6UKtx7REimcR7n7MRJA4DIckPZFV6xwnPcGtBc45NAmTySsqktstwYYU0e0MhitXHJv12BT33djrLBa6I8CK90mwxI4WgEuc466ClK5nJZ+EJmZlxM1scV9shm8tLqBdLXxDM8hoOATH2Qozd0IGgLTunVXH2DaPNUTo85tt2zM2eEWmYJB2haGBaI4bMt61g1aJvbxbmeImuC7tyIXaMDgDSfLzWuEZ7Hx554vq+vQyx34Dk6YRGHeDH5q/aOjcC0ib2Fr/wDmsIa7mcncwVlY3R+0sY+JD/iwoZ7Th2XBsp4iwnKWya58njuOj0sPmQyLvo0bNrHkHaCQh9quOHGeYkRuJ5lNxoTISE5bgFmoN7vYdUau/pADmVJqaOhcXoK2W4OrcHQnEDVhOIciajzW0u50mIBdtua/VHbNrXRPhf8ARDyLcWmW8aWNRgrgK7jzCRxTMSQcukLAHCMRqni1FViFxFsC3+aKSqJI5MKPkyyd9vFFHHtDmhsASiCW1Xye14rJbHjosWY0RG7zmobuuqM9tGgT/UQ3yz8kXs1wWhoPYB4Pb7lLaNpjILqjijrXVQuFdkdrhOE+U8wJjxE1en2k0RGZa8bO6HEdDOYy3tOR8E1rSBM04rT361pIMqtFDqFnLe6reXql4lvmpBi5Lo62K1j3SBnPDnIcV6ddl2wrOyUJgbOUzm53zONTwWK6KNnHG5p9lvyaN4pRXOT2Yv8AEa8JvhwG/CMbpCZBdMNB2UBP7ll7NOnYnsxADwOasXxaDFjviYiMTiQC4ukNBPhopLJaYgEp4x+lzWuHmVR6OdsO2CDEkD1LNo7588KKsc5ol1JcNQDOuspqhdkd7RIWeXBzmDkDMI1Ae852eJycx3qQpmHLHChuo2bXZ4H9l3IEVHBSRrBWoI2GQM92VFcGFwk6E8bnMBkdokVYbKUpu5td7hUiKyrdJiMMpuI0bNtRPSgkfqrmAMstvAoA18hu6skDzVixyB//ACVy84IbZba4SAdDJ2VwFrqbyCeaefaT9G4em0YToZd8KOYrYrA8BrZTzBmagio5Ita+gEF1YUV8M7HSe32PmVS/Dzvxvlb6lbyGVGKTOuUpRfTPNotx2yyODiC9k+9Dm4cx3hzElvbnY4Qw50wTodiIEppQscVKzZZ5SjxY5rl1xTAUiVQgPBXQVCSl1qywJyUwpgjLvWhbYHV1R9cEkGny4ywODsSv2aHhOIium7etX/wvcgN5MwRXN2S9AkuytUHLjjjX78VoWvnX75LGXfFkRVaewxpj78hopMstBNtvM+6eG3eJT8wFdixGOHaAdlMOFQCcxw3Icx0jv9+KkZaZa/dVlhRBetxiKCYTpO/S40PB2nNYa+LDGhFvWQ3sEwJkdnP9Y7J8V6VCjA1I4fYVxloBGHU6HymNU6mybxozPQwnridMMjzK0nSa2YIOEGTnzaNsviPh6hMhQGQnFzYYbPMtEgeIFENv6zm0FpxN7IIDSCczMnvcKreSJuEvwBwrudo08QJqxCsbhmXeElSdFMIkFmWcjIy0MsJpvy3p0PpCAJhjiNvWjCOJaJLbsk4SX4GrPZm6ifEz8ijthsrC0dgT2gFp8WrL2TpKHaw+cWf9pRmy300ATdDb+8y5TCBeL9GlgQR+p4/e8/8AVNWmwv53eR9Qs/Dv2F/6hg5j6KwzpFDH/nQ3eM/9oTJoXi/RpbODqRxlL0VLplGLbJF/mY4TGyn1ch9j6SwZ1cQf5Zvb5jF5KPpramWiyEQopD2uacE8GNpMnNcHSmJGfJUtOJsYtSVoB/h53o3Bnq5bI2ggywPO8CiwnRi1ssnWGK9vaDZBpxGk5zOWu1FrT0/gQ29wk8fWSlHrZ0S70ahtoP6H+C5EtjW94gbiRPwXlV6dN41oMmucxuxhI5dnNKxXnjEpueRsOXEgOKJTo2OOz0yJfUAZvHmrMC2MeJte07qg+Yl5rzl8OenvLyCO3MSJVUvm7K/AqNYcX6VG8P8A0qW7o05A8lfwLoik1ZzNU6AkRsXRg5lV3QrToGeJWi6pLq1vBGWZvqLTsh+aS0nV7l1HBG2eXizrLdMbpcCIzRNsgHy+E5AncRTktw1oUgYJSNds9inQ/I8js8YhH7rttZTlpJN6Q9GYkFznw244WYw1cz+VwGYG0c0Es8aRCWUSkZG3Ecff3vXOtQSzW0FXIVpGSmVC8GLJTstBnI7s9p/z6IVDi05VVhj5y++awA1ZrYRnlsP3wopIkFr5lmY0n9yQkRDnTLns+ilhRZcfDzW2FDLxsYcJPaRLI5EHKYP2DvWPvCyGHEk8Ak9yICYZfuEUdx/8rpg6EZLfQrcZVk4b/BQ2uyWeO0teJAitBLPfTVamK0Ydja4cc3DOFaIYx/tiDPirQoABiG6dFYt3Rq0Q2yYRaII7lZRYfyz7wG48kGix3M7LgWkATaaHmDVFGIvOjAcc8z9+ajFv3/fFBo9qJVmz2GK6pGAbXmVPl7x8E3H2K5egkbzIyMlz81EflltNB46qFsBjf5jtIoP2/UnguPiE5ngtsziTtYB3nk8KeakYWAzDRxNT4nJUXFPhvklY6SCX5s6nxM1ILWDWQmPumqFxHJrXGaWh7NPZo0/fijNgj1Fa+Kzdid96ItYycU9ym0Uvo3d1PnhGZp6rRhgQHo7ZiRjM5SpvKPSXXi+pxZfscwpwYndW7ZLin9U7WnoqkyLAkp+odu8UkAeXNTgFTFoS/MqVjl4OWcvrolDjEvhO6p5mSJTY47ZDunePBFvze5IW3etA8+tdx2yBV0Fzh+qH/EHgKjmAqkK9QDImR1BoRyXp350bQla7KYrZGHDdP/mBrgBtLSllxW2UgpvSMHAvEHUIjCt0/vVaqzXPZIDZdXCrnJjc9uSqWu4bLEq1uA7YZw/7e75Lm+RHWsUqBLLWOe3dX/Cnba6ffslG6KEdyOd2NoPm2SHvua1Nycx3iPYo5R9mfHL0GRGBH34eacyPL7Giz8Cz2gktm0SzzITrRAjNFYn9IlpKqLQcJeg4+1CdHAHcZIXed4Q4rcD2daBORMwQdrXCu1B2PM24jPMeZATHPVEqJMlhhrO41rf5hMu/rMz4EJroxUHWLgiJhSbGkAFAHp4M0GjztT8KjbNWGQjy2lYaRuapoMH/AD9+Cv2CwOiEBjHxCdIbXO9AtRd/Qi1uIxsEFp1eQXcmtn4GSKbMbS2BLssrnSaASTkAJknYANeC9A6MdE3BwfaGYGDutObjscB3RuNTuRW4LjhWWrQXP1iHP9o+ELRQbSDR0uP1GhVI41tkp5XpDzBAEpAjSQkQOScG0oZjemmbatqNn0XOsa6oMj957VUiJs8h/S72K6QRu3GoTTHGThzH3RcNoA1xDZqgBTH6W+KSb+Yh/p9EkAeJEOA15y5pjohCNOg8E02IHRc3M6fjALrVL/Crvt53o++6mlV4nR9rtZI+QPjALb1Ic00MjOX1TYF4xI8R8THhxHuMaZAASzNBlmjJ6IwzXG7lL6KRvRGHUF8QzJJm6VTnRspJJNMtifFUZS3XtFaZCKaaSaZeShgdIYgzdNa//wDi7L+kn9zvvYmu6B2Q/A7k9w90fz6Gc5X0CrH0pJEjKasRr4JFFcHQOyjIRP8A7HKUdC4AydFH7/8ACVxj+DrK/wBAJvcgZKvGvKYWmPQqCfji/wBQ+iif0Fgauif1fRH8g8rMU6LU13hJ8TXJa2J+H8DR0T+qfqoIn4ewzk93OqdTic7i2zIRLWwZuHr6KubwbpM+S1sT8PBo8qhaPw/ijuunyTrJD2I4TBtiJfmQB4rWs6PYoJfDeXEaUJ5DXPJZOPcNrgfASBuPst50LtTTY4jSZRQ15AzcHAEt7Opn4pJv9TL4lF2mgHYbgtGIdc4taf0tw+BlvXpfR6w2eE0BsFpOrnDG8n5nTpwkg11nroeJ8KK2KWgERMQbOvabPI5ZSzRSyQXDP0mVWE1+kMsKfTNXBjDSg2ZeCs/mXOGHPj9UCs7iPuSuQo3iqWiNBB4IzEkg5W7JGbEGF0p+v+VBaYBYdo2+xWmHGOOQJ5Kw2zTEwZqmCrFnjyylwyB+hWAPbBrJ0xs2J7rIRlXcrMN4eJS4gpuEtyqNmo4JjCvgH6CkrP5kbD4JLAPKXZfe1Ob7+y4kuQ7CZma4z78kkkASDXinfRJJYA1y6zPxSSQBNr4e6S4kg05s4+66/PmkklYCXW5niuJJTRHPmox9Uklho5mZ5qazZ/e1JJbECd2X3sT3Zfe1dSV4k2WGfDzVqFmuJKhJliw99vEI7be4UklRaJS2Bx7LuqSSw0vwu83gr6SSeIjGpJJIA//Z',
    description: 'Whenever I feel stressed, I always like to meditate. It helps me to relax and clear my mind.',
    comments: [
        { id: 6, username: 'user6', text: 'This is great!', profilePic: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { id: 7, username: 'user7', text: 'Thank you for sharing!', profilePic: 'https://randomuser.me/api/portraits/women/4.jpg' },
    ],
  },
];

const CommentsModal = ({ isVisible, onClose, comments, postUser, onAddComment }) => {
    const [newComment, setNewComment] = useState('');
    const slideAnim = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: height,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible]);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            if (gestureState.dy > 0) {
                slideAnim.setValue(gestureState.dy);
            }
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dy > 100) {
                onClose();
            } else {
                Animated.spring(slideAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            }
        },
    });

    const handleAddComment = () => {
        if (newComment.trim()) {
            onAddComment(newComment.trim());
            setNewComment('');
        }
    };

    const renderComment = ({ item }) => (
        <View style={styles.commentItem}>
            <Image source={{ uri: item.profilePic }} style={styles.commentProfilePic} />
            <View style={styles.commentContent}>
                <Text style={styles.commentUsername}>{item.username}</Text>
                <Text style={styles.commentText}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
            animationType="fade"
        >
            <TouchableOpacity 
                style={styles.modalContainer} 
                activeOpacity={1} 
                onPress={onClose}
            >
                <Animated.View
                    style={[
                        styles.modalContent,
                        {
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                    {...panResponder.panHandlers}
                >
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>Comments</Text>
                    </View>
                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderComment}
                        ListHeaderComponent={() => (
                            <View style={styles.postDescription}>
                                <Image source={{ uri: postUser.profilePic }} style={styles.commentProfilePic} />
                                <View style={styles.commentContent}>
                                    <Text style={styles.commentUsername}>{postUser.username}</Text>
                                    <Text style={styles.commentText}>{postUser.description}</Text>
                                </View>
                            </View>
                        )}
                    />
                    <View style={styles.commentInputContainer}>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Add a comment..."
                            value={newComment}
                            onChangeText={setNewComment}
                        />
                        <TouchableOpacity onPress={handleAddComment} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    );
};

const FavoritesScreen = () => {
    const [favoritePosts, setFavoritePosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        // Simulating an API call to fetch favorite posts
        setTimeout(() => {
            setFavoritePosts(mockFavoritePosts);
        }, 1000);
    }, []);

    const openComments = (post) => {
        setSelectedPost(post);
    };

    const closeComments = () => {
        setSelectedPost(null);
    };

    const addComment = (newComment) => {
        setFavoritePosts(prevPosts => {
            return prevPosts.map(post => {
                if (post.id === selectedPost.id) {
                    return {
                        ...post,
                        comments: [
                            ...post.comments,
                            {
                                id: post.comments.length + 1, 
                                username: 'You',
                                text: newComment,
                                profilePic: 'https://randomuser.me/api/portraits/men/0.jpg',
                            },
                        ],
                    };
                }
                return post;
            });
        });
        closeComments();
    };

    const renderComments = (post) => {
        const visibleComments = post.comments.slice(0, 2);
        const showViewAll = post.comments.length > 0;

        return (
            <>
                {visibleComments.map(comment => (
                    <Text key={comment.id} style={styles.comment}>
                        <Text style={styles.commentUsername}>{comment.username}</Text> {comment.text}
                    </Text>
                ))}
                {showViewAll && (
                    <TouchableOpacity onPress={() => openComments(post)}>
                        <Text style={styles.viewAllComments}>
                            View all {post.comments.length} comments
                        </Text>
                    </TouchableOpacity>
                )}
            </>
        );
    };

    const renderPost = (post) => (
        <View key={post.id} style={styles.postContainer}>
            {/* Overlay for profile picture and username */}
            <View style={styles.profileOverlayContainer}>
                <Image source={{ uri: post.user.profilePic }} style={styles.overlayProfilePic} />
                <Text style={styles.overlayUsername}>{post.user.username}</Text>
            </View>
            <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
            <View style={styles.postFooter}>
                <Text style={styles.description}>
                    <Text style={styles.username}>{post.user.username}</Text> {post.description}
                </Text>
                {renderComments(post)}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                {favoritePosts.length > 0 ? (
                    favoritePosts.map(renderPost)
                ) : (
                    <Text style={styles.noFavoritesText}>You haven't favorited any posts yet.</Text>
                )}
            </ScrollView>
            {selectedPost && (
                <CommentsModal
                    isVisible={!!selectedPost}
                    onClose={closeComments}
                    comments={selectedPost.comments}
                    postUser={{
                        username: selectedPost.user.username,
                        description: selectedPost.description,
                        profilePic: selectedPost.user.profilePic,
                    }}
                    onAddComment={addComment}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    container: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: 80,
    },
    postContainer: {
        backgroundColor: '#ffffff',
        marginBottom: 20,
        width: width,
        position: 'relative',
    },
    profileOverlayContainer: {
        position: 'absolute',
        top: 5,
        left: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 5,
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
        width: width,
        height: width,
        resizeMode: 'cover',
    },
    postFooter: {
        padding: 10,
    },
    description: {
        fontSize: 14,
        marginBottom: 5,
    },
    comment: {
        fontSize: 14,
        marginBottom: 2,
    },
    commentUsername: {
        fontWeight: 'bold',
    },
    viewAllComments: {
        color: 'gray',
        marginTop: 5,
    },
    noFavoritesText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: height * 0.7,
        paddingTop: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    commentItem: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'flex-start',
    },
    postDescription: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#f9f9f9',
    },
    commentProfilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    commentText: {
        flex: 1,
    },
    commentInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#ffffff',
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
  },
  commentInput: {
      flex: 1,
      borderColor: '#e0e0e0',
      borderWidth: 1,
      borderRadius: 20,
      padding: 10,
      marginRight: 10,
      fontSize: 16,
  },
  postButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
  },
  postButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
  },
});

export default FavoritesScreen;

