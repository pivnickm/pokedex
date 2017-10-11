"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/pokedex/index.html","709b517584da9e7d654400905833b2ca"],["/pokedex/static/css/main.5d66bb2a.css","97be085210ccaed2deb34406fc99dfd2"],["/pokedex/static/js/main.3a9e7d6b.js","1b621ac74f1e5f6e3e9bcf677d42eefc"],["/pokedex/static/media/1.66f22baf.png","66f22baf80adc6f12c25d15af9d912a1"],["/pokedex/static/media/10.3121c5e4.png","3121c5e428765acce1a34889c74333a7"],["/pokedex/static/media/100.2cf47447.png","2cf47447b4ae4b4f6f6ff95b2132a6ad"],["/pokedex/static/media/101.beb9396f.png","beb9396fbebbaf868c8ebab7602d98ca"],["/pokedex/static/media/102.398fe4d1.png","398fe4d1acc9f5be924c4c546d381b08"],["/pokedex/static/media/103.ac1484ca.png","ac1484ca6fb839479bc4e73ba3852c39"],["/pokedex/static/media/104.ad28d6bd.png","ad28d6bdbb3032bdd502e473fb7f5680"],["/pokedex/static/media/105.1719d822.png","1719d8229ce483bf3955597328390578"],["/pokedex/static/media/106.b7503854.png","b7503854f8e6d46c66614b4c75fbac25"],["/pokedex/static/media/107.c96b8e4a.png","c96b8e4acd0dacdb04c99570664e47b3"],["/pokedex/static/media/108.dc50a0d1.png","dc50a0d13e72587ed83757a22f9e333c"],["/pokedex/static/media/109.9dca9a15.png","9dca9a154a76fb1e2e19cdf6383fcc7b"],["/pokedex/static/media/11.fe3be419.png","fe3be41910dcf033af10d9b7a3d85703"],["/pokedex/static/media/110.c9f1635b.png","c9f1635b6df68843b4334020ab6df71f"],["/pokedex/static/media/111.1e0fde43.png","1e0fde43ac3a3ccd10b9f5928be37021"],["/pokedex/static/media/112.765ed63a.png","765ed63ab555848dca5170070cfd4934"],["/pokedex/static/media/113.a0c056fa.png","a0c056fa5858949090ca4f49fbe52f4f"],["/pokedex/static/media/114.a89200fb.png","a89200fbd464cb6b50ce7a4160585c6c"],["/pokedex/static/media/115.135c34c1.png","135c34c1013ad4a03173de14d770aebb"],["/pokedex/static/media/116.5adeb235.png","5adeb235b26f4259d3093afccc40bd5d"],["/pokedex/static/media/117.956db194.png","956db1948bf88d4766f569c2c747396b"],["/pokedex/static/media/118.5911dd10.png","5911dd1088b901deaa287449add2e8a9"],["/pokedex/static/media/119.d8144e91.png","d8144e9118f576ffc55c92e8a5b07bba"],["/pokedex/static/media/12.7b830e29.png","7b830e2916626c4e05940cd230de8113"],["/pokedex/static/media/120.5059d143.png","5059d143f9a102e269ae8c0dc7ac5396"],["/pokedex/static/media/121.e7cb978e.png","e7cb978eafba547279b0340879ad3310"],["/pokedex/static/media/122.7774f139.png","7774f139f29757c1f152517fe1e5c568"],["/pokedex/static/media/123.138bbd88.png","138bbd887ac5d72a9744fc0448c43f5a"],["/pokedex/static/media/124.7bc8f3a5.png","7bc8f3a5f55a9b580018bcf77e5b5acf"],["/pokedex/static/media/125.8487e6ef.png","8487e6efcb2aef66aae18f5e0dca6387"],["/pokedex/static/media/126.d6230347.png","d62303471a58dc23465c8f9ad34753ff"],["/pokedex/static/media/127.d618bef9.png","d618bef9870ad64a4304952ea3c6ecb6"],["/pokedex/static/media/128.3e28e8e8.png","3e28e8e882be96dedac9173aae4605aa"],["/pokedex/static/media/129.d2b6938b.png","d2b6938bc0983a2afb61510e87f315bd"],["/pokedex/static/media/13.0e8b0e35.png","0e8b0e35cc0761d9ef4210d3896e8761"],["/pokedex/static/media/130.6e3a388d.png","6e3a388d82dcbb46d9cb6687f196c1fb"],["/pokedex/static/media/131.d1f8dc12.png","d1f8dc127551cdfde97f5abaa50084f3"],["/pokedex/static/media/132.3dac64b0.png","3dac64b00e72f9a053b0ef23b1163e1f"],["/pokedex/static/media/133.7e76ea89.png","7e76ea896a18e4f736c6090dc1cb08a8"],["/pokedex/static/media/134.e3a08634.png","e3a08634e405b1e7a6159efa721baafe"],["/pokedex/static/media/135.24a8ff41.png","24a8ff41bbff4a44d896e433165d2bbd"],["/pokedex/static/media/136.d8f70c8c.png","d8f70c8c82570b648ff4c3cdd74cb21e"],["/pokedex/static/media/137.e8fc1acf.png","e8fc1acf0558a8b4d37cdfb7435e2abb"],["/pokedex/static/media/138.8ac88a06.png","8ac88a06c0eb6003cb46a4d3530ddfc7"],["/pokedex/static/media/139.5aca537e.png","5aca537e4f9ef19053f0a940e86a13a3"],["/pokedex/static/media/14.4816a878.png","4816a8780cfeb1195851b2d0165eafb1"],["/pokedex/static/media/140.a946ed48.png","a946ed480cb36e12532bea29e2bbad36"],["/pokedex/static/media/141.8116b416.png","8116b416a61b8ea622dcdd12d3397b9a"],["/pokedex/static/media/142.753b39cb.png","753b39cb717999f9588ff184f067a5bc"],["/pokedex/static/media/143.f8456b4f.png","f8456b4ff064b6a95bbc07b255acd980"],["/pokedex/static/media/144.18853da7.png","18853da77847d236688d9871f1896247"],["/pokedex/static/media/145.6af7ba97.png","6af7ba97c1fbf5f6f9e67200829a393e"],["/pokedex/static/media/146.92eb71a4.png","92eb71a42de2a721dc98ae93b4abb384"],["/pokedex/static/media/147.8bfb5cac.png","8bfb5cac2030f7098fc31dea2f4d2b90"],["/pokedex/static/media/148.b2e1d94f.png","b2e1d94fd5235f763ab9f60820effe8f"],["/pokedex/static/media/149.510e1e5d.png","510e1e5d26e3b631b90cb64268dea786"],["/pokedex/static/media/15.8dbe2424.png","8dbe2424ae5f3a5f14d0f104268deed7"],["/pokedex/static/media/150.cdb0a402.png","cdb0a4029e7fda2ec488e5356ea684e9"],["/pokedex/static/media/151.e8992c57.png","e8992c57184ab02a7227c40350a3c26f"],["/pokedex/static/media/152.35418418.png","35418418d18b546733a94e22cc988cb5"],["/pokedex/static/media/153.c208f13d.png","c208f13d2c7e2217593bd889205d0a27"],["/pokedex/static/media/154.54e77c25.png","54e77c25e9c909a04f354e859e221680"],["/pokedex/static/media/155.ca0001c0.png","ca0001c09a292477401208de07b43b21"],["/pokedex/static/media/156.4d6bf205.png","4d6bf205e3bb0e62e4db10cd8e367146"],["/pokedex/static/media/157.af770dd9.png","af770dd9ec840df88ef1587ca1e54d95"],["/pokedex/static/media/158.ea1816c9.png","ea1816c912c94bd4b92b60a682345a3a"],["/pokedex/static/media/159.78f2e320.png","78f2e3200e7a279968889754defd1cc6"],["/pokedex/static/media/16.4f5c2e10.png","4f5c2e10c47272ce3d4a4b47e5332e21"],["/pokedex/static/media/160.2e0674a7.png","2e0674a77feb7a82c54abedf7a4fc3c1"],["/pokedex/static/media/161.51dd18f4.png","51dd18f4edaa3ce7e4a1b9e5a914ecdb"],["/pokedex/static/media/162.681664ec.png","681664ec95e4efa1ede4407ef7d182c5"],["/pokedex/static/media/163.97ffaec7.png","97ffaec71674643876e236d799e95cb8"],["/pokedex/static/media/164.8bbc1e4b.png","8bbc1e4bbfc676a0d099e45a02745ea0"],["/pokedex/static/media/165.efcd6b49.png","efcd6b498558798160c0ebea11aef438"],["/pokedex/static/media/166.c7634117.png","c763411738f727692462c6048ff44426"],["/pokedex/static/media/167.95ee14dd.png","95ee14dd65c3019021181ce2eb61f906"],["/pokedex/static/media/168.5be51dde.png","5be51dde73e3dde814081072fb99eab5"],["/pokedex/static/media/169.9d9f7ac8.png","9d9f7ac83b2f46ef0d1895db00dc8052"],["/pokedex/static/media/17.a8c44b0a.png","a8c44b0afcbf29d20efa77926f8579b0"],["/pokedex/static/media/170.1076c506.png","1076c506fc983a68427bc4bbde36c47f"],["/pokedex/static/media/171.6b2ab540.png","6b2ab5405508e53dd85e8fb9a6899bb5"],["/pokedex/static/media/172.5ff37387.png","5ff3738761a442bcc1e33120bbcb2db2"],["/pokedex/static/media/173.e35f07ec.png","e35f07ec08ec9c3bc78e84172266972d"],["/pokedex/static/media/174.d7f4dc07.png","d7f4dc0719b49630e670a0103a65e2e0"],["/pokedex/static/media/175.b957b77b.png","b957b77b16cda57f0b472d6e11d85267"],["/pokedex/static/media/176.26d239cc.png","26d239cc236dfe555e97ea81b4dfff50"],["/pokedex/static/media/177.5a9c91e9.png","5a9c91e9b5d4c909c4557c1d776491c8"],["/pokedex/static/media/178.f7bdbf42.png","f7bdbf42dbaaa923591f4ecdfee0ca66"],["/pokedex/static/media/179.73e8a694.png","73e8a694e8b849130a33dded1ab3421b"],["/pokedex/static/media/18.6db0cd8b.png","6db0cd8bf892a72dd79f5201608da369"],["/pokedex/static/media/180.68f45522.png","68f455225694b38fc79c9338c610eb07"],["/pokedex/static/media/181.4bcc99d9.png","4bcc99d93ec56107e79b3d5fe7c2d56d"],["/pokedex/static/media/182.ae23eb6c.png","ae23eb6cfb14ce3355ef73d88de668a9"],["/pokedex/static/media/183.4ddd8d0a.png","4ddd8d0a426c853cdd3070270ec067a1"],["/pokedex/static/media/184.c6d83d66.png","c6d83d66e0b7077b3078070cf540f027"],["/pokedex/static/media/185.5cfc06cd.png","5cfc06cd8e38f9d7f3e63a6033c327f5"],["/pokedex/static/media/186.ae942023.png","ae942023f6e5593b7180649148bd5a88"],["/pokedex/static/media/187.e982f07c.png","e982f07c55f4b6a295c4e5cdd532be99"],["/pokedex/static/media/188.726dc51b.png","726dc51ba9fb5c9b48e00f5e24c71af0"],["/pokedex/static/media/189.02d1bfbb.png","02d1bfbbc340df6c40e848108342743a"],["/pokedex/static/media/19.60b0caab.png","60b0caabeb09bab9237105ed985ad626"],["/pokedex/static/media/190.3d7329c2.png","3d7329c2461d69c8a2fd9fe09cebb0ce"],["/pokedex/static/media/191.f8f8f681.png","f8f8f681addaa2c1f746c511468f6492"],["/pokedex/static/media/192.af5f1202.png","af5f12029314f29d8728ea0338a954c1"],["/pokedex/static/media/193.5af406ec.png","5af406ec017a4e0afde087dc8dabe4b1"],["/pokedex/static/media/194.2c60db0f.png","2c60db0f97defcbfcb293183e67e2909"],["/pokedex/static/media/195.a53d3bdc.png","a53d3bdc5c4ffb67ae52de611f20629e"],["/pokedex/static/media/196.d2a37cf2.png","d2a37cf276af9469f67a544774c39458"],["/pokedex/static/media/197.9513589e.png","9513589e281f552533b436e877b1cd64"],["/pokedex/static/media/198.6780b583.png","6780b5839d10224eb2d01a5cdcf56d62"],["/pokedex/static/media/199.97b1e39c.png","97b1e39c72d02a17ca07e5ef44cc4f12"],["/pokedex/static/media/2.dbf27e11.png","dbf27e11da18ad6445934ffd833647dd"],["/pokedex/static/media/20.e061782f.png","e061782f9c6327e23b5275560fb43041"],["/pokedex/static/media/200.ec83f389.png","ec83f389c83e460c1ec7667b8c43b22e"],["/pokedex/static/media/201.941acad1.png","941acad140b3b2832c2a214a6af06410"],["/pokedex/static/media/202.610aed0e.png","610aed0e87e9a176efc3e4b810e6844a"],["/pokedex/static/media/203.c8703f5b.png","c8703f5b11e8caf784db65edd2a6ae25"],["/pokedex/static/media/204.63f7d7d8.png","63f7d7d8ccdfddd075f70c8705c98c12"],["/pokedex/static/media/205.876a3ab4.png","876a3ab4afd4ed483311768b29cbb15c"],["/pokedex/static/media/206.e5dd5be8.png","e5dd5be85a74dc5cfda096e82b19e7c2"],["/pokedex/static/media/207.2614c1f1.png","2614c1f1741d4f93c7a7445e7edf365c"],["/pokedex/static/media/208.2faaaf03.png","2faaaf034adf456a2a1304c87337b110"],["/pokedex/static/media/209.1cfd1b30.png","1cfd1b30eb48639ba27ecb123e046422"],["/pokedex/static/media/21.ae2660ed.png","ae2660ed43a61788188a70897d2b7e31"],["/pokedex/static/media/210.a965329e.png","a965329eb9450c22f1b1e6d29580b637"],["/pokedex/static/media/211.7ee7fe0a.png","7ee7fe0a8bd346f888e4ffd6ca6b78ae"],["/pokedex/static/media/212-mega.e32e2f9b.png","e32e2f9bfbc05f60ab0f90fc67612264"],["/pokedex/static/media/212.51392945.png","513929455d6d2bba3e299533cfb1eaf4"],["/pokedex/static/media/213.7433ce51.png","7433ce518e18d543bdd0648aa4a43da5"],["/pokedex/static/media/214.f1422096.png","f1422096f45c4b5bb8905950454ccd87"],["/pokedex/static/media/215.52fdf6d8.png","52fdf6d885f2c02bef02bbe29c21c388"],["/pokedex/static/media/216.bb16fcd6.png","bb16fcd6a81a2111fc99a89e93c950ee"],["/pokedex/static/media/217.d99a85c8.png","d99a85c878e4ff97cab3af00a33eb5a7"],["/pokedex/static/media/218.597e2992.png","597e29925bd92c372fa4a236fff03eb8"],["/pokedex/static/media/219.6456cc04.png","6456cc04e5ef13330a602d8bf12f933d"],["/pokedex/static/media/22.7c7bee65.png","7c7bee65e84a1ce29ac230310baec2cb"],["/pokedex/static/media/220.d2f6c733.png","d2f6c7339dd90e922b4443509da0786d"],["/pokedex/static/media/221.27ee7fe3.png","27ee7fe3c05c7d9f6442c80746681e63"],["/pokedex/static/media/222.bf7f74c9.png","bf7f74c9b893280db3c4da5817b3c1ca"],["/pokedex/static/media/223.499cabd3.png","499cabd340df3ae89d42306347c7d4c1"],["/pokedex/static/media/224.18850516.png","18850516bf81fbaf14939fad1ab80f03"],["/pokedex/static/media/225.ab2d1e55.png","ab2d1e552150f6b99b2023501742fa0d"],["/pokedex/static/media/226.c60ef2d4.png","c60ef2d42faca257d69284c6ce18be8b"],["/pokedex/static/media/227.77a90706.png","77a90706e30584b9387e1216aea5f12f"],["/pokedex/static/media/228.e242811a.png","e242811a0ab9b9a8a5fe674722053647"],["/pokedex/static/media/229.b9ba224e.png","b9ba224e5c7b73174d8b6c2dad2b0ae4"],["/pokedex/static/media/23.e18d0e22.png","e18d0e22b6c3ab3ee407056bfa356a80"],["/pokedex/static/media/230.733d3601.png","733d36019e05b45d9a30c673e3bfb86c"],["/pokedex/static/media/231.35d56c32.png","35d56c326b99e0081741416bdb13d401"],["/pokedex/static/media/232.c2e04667.png","c2e0466754c9015addae9bc10d1683de"],["/pokedex/static/media/233.c41c7643.png","c41c7643898bf7209edbe8fb588423d8"],["/pokedex/static/media/234.23c6116f.png","23c6116fb3dddfa1bc5a11931bc1af25"],["/pokedex/static/media/235.ea062c1e.png","ea062c1ecc2e94bfe6314d58a6757fd1"],["/pokedex/static/media/236.05074b5c.png","05074b5c08e67459b995e0e8ef535d24"],["/pokedex/static/media/237.764020bf.png","764020bf8a35b0bcc97831083556de5d"],["/pokedex/static/media/238.67c2159a.png","67c2159aed02a14e50d48bdb46640ec2"],["/pokedex/static/media/239.3055d9a2.png","3055d9a2fee95bb39b57ec93511fa9b9"],["/pokedex/static/media/24.a3c51581.png","a3c51581dcf877ff65dc0e61b98b3348"],["/pokedex/static/media/240.fd1c6473.png","fd1c6473fba2fab8632e302efa5e1753"],["/pokedex/static/media/241.82850469.png","828504690cea951c5d8352e3ccaf8174"],["/pokedex/static/media/242.15ad80e3.png","15ad80e31aabcf77132cd8dc430f4267"],["/pokedex/static/media/243.aee7df6d.png","aee7df6d31b488004919640818c73f89"],["/pokedex/static/media/244.73b1734e.png","73b1734e03f460fdac707dd365148e17"],["/pokedex/static/media/245.b57106ae.png","b57106ae1955d4812e6f50dd0aedab22"],["/pokedex/static/media/246.5cda71aa.png","5cda71aace09cd8e554b38199371bafa"],["/pokedex/static/media/247.253921d3.png","253921d34d8ad47977f5e64c5670d48d"],["/pokedex/static/media/248.35448003.png","35448003d8200dc141220038a7e05167"],["/pokedex/static/media/249.e89f1d06.png","e89f1d062d12f584e822b12f82824ca9"],["/pokedex/static/media/25.251b8037.png","251b80375b7103beba753ece0e237cef"],["/pokedex/static/media/250.af2974fa.png","af2974fa213a985f935c3b7a0c75fe3c"],["/pokedex/static/media/251.99873c65.png","99873c65c30d4c4a323796e741e0cc2a"],["/pokedex/static/media/26.f355c668.png","f355c668b74f994d05667f2394ff480d"],["/pokedex/static/media/27.a53672c6.png","a53672c62cb75d05f50f48f8a8397cae"],["/pokedex/static/media/28.668c896d.png","668c896d2763382b4e009c66e1507528"],["/pokedex/static/media/29.d6db21ef.png","d6db21ef81133524290e191c8f37f432"],["/pokedex/static/media/3.b8074533.png","b80745335c269a3f9fde76d7e510c18a"],["/pokedex/static/media/30.4a27fcc7.png","4a27fcc78a21ab5b712b4ae1da82949f"],["/pokedex/static/media/31.185c7cfb.png","185c7cfbf85fa5e3bd66903bf76ac423"],["/pokedex/static/media/32.121c1303.png","121c13035a79061589d2f84163831ee9"],["/pokedex/static/media/33.9233d902.png","9233d9027c2d3d3461efaa42668941de"],["/pokedex/static/media/34.6a6d2d3a.png","6a6d2d3a2ad34e86495fe4e4b98f84fa"],["/pokedex/static/media/35.3838bfe1.png","3838bfe12c8b322dc136908e73bda55b"],["/pokedex/static/media/36.aaf2069c.png","aaf2069cf9465ab26df319a37ac58b12"],["/pokedex/static/media/37.80498bba.png","80498bbaa05677ebe4e053e1fac1283d"],["/pokedex/static/media/38.098c00b2.png","098c00b26e6e525301a67a5baabe0a8f"],["/pokedex/static/media/39.7f6305aa.png","7f6305aa9b097addc3e780a8444bdce5"],["/pokedex/static/media/4.4b5f8637.png","4b5f86377b56d5c056f7494d73f151d4"],["/pokedex/static/media/40.0b752210.png","0b7522102e4e5fffac7de348b5a81fd7"],["/pokedex/static/media/41.364c3cb9.png","364c3cb981fe6769fac909dcf3e4b4aa"],["/pokedex/static/media/42.0edbff60.png","0edbff60a8993aca3b089851f831a796"],["/pokedex/static/media/43.35719dc5.png","35719dc59176dbf7dc78896d7de17691"],["/pokedex/static/media/44.8467cfe3.png","8467cfe3319954091f14e016e5e7fdd0"],["/pokedex/static/media/45.47c286ff.png","47c286ff9321bfb2524449f33f97b53d"],["/pokedex/static/media/46.2843dbf9.png","2843dbf983b5a312757ce7892bfcff5e"],["/pokedex/static/media/47.b8613bbf.png","b8613bbfad10d5075a9269883794628a"],["/pokedex/static/media/48.53802a72.png","53802a726ba6a512ba3bd700d1f0e6b4"],["/pokedex/static/media/49.0cdd5802.png","0cdd5802ae498506e3b5dbde1fcedaac"],["/pokedex/static/media/5.447fd6b2.png","447fd6b2dd61e2a0897a897e0001a5b1"],["/pokedex/static/media/50.17c8465b.png","17c8465b18cf92e3949e577ebc758a9b"],["/pokedex/static/media/51.00090abd.png","00090abdebcd00331024c47617874825"],["/pokedex/static/media/52.5047ea06.png","5047ea0633befef8632b6a6c4f41e889"],["/pokedex/static/media/53.1572a97a.png","1572a97a09e168b1364e3f86cdb85889"],["/pokedex/static/media/54.8e1d15d6.png","8e1d15d604f2088dac1187f6fa763447"],["/pokedex/static/media/55.eaea8cd3.png","eaea8cd37ab06bbfe30fd38f72d72b46"],["/pokedex/static/media/56.9a048b5c.png","9a048b5ce0f8c1d4ad7cc9f29d1630ec"],["/pokedex/static/media/57.d0c156a0.png","d0c156a02c04289090551d1ab0324ad3"],["/pokedex/static/media/58.18005fdf.png","18005fdfe6da1e44f1ee487401a2bedb"],["/pokedex/static/media/59.5e8d53d9.png","5e8d53d98c4873529daf66020382cad0"],["/pokedex/static/media/6.9b832039.png","9b832039096d7584a735f7caa74d9d4e"],["/pokedex/static/media/60.48091923.png","48091923542c3af0a7ec660ec99de25f"],["/pokedex/static/media/61.ac36437f.png","ac36437fe41f9c4eac470910a9aa1431"],["/pokedex/static/media/62.5174bf50.png","5174bf505bcc411e27c91f3e99d4c2bb"],["/pokedex/static/media/63.602f44d4.png","602f44d4042c2dbcb8d5eb7704ce5254"],["/pokedex/static/media/64.7c635a0c.png","7c635a0c8940c3c488c721da5c424503"],["/pokedex/static/media/65.59380abb.png","59380abb9c987ba1aec5d8a6d9f14ee3"],["/pokedex/static/media/66.6fae4425.png","6fae4425f48f623f0762b6fad08af9af"],["/pokedex/static/media/67.64146530.png","6414653043997a49e370826325addf43"],["/pokedex/static/media/68.220ad7c9.png","220ad7c92a2f1f14b5539d93e8fe0ba0"],["/pokedex/static/media/69.1cc0e507.png","1cc0e507283ab0acf0cfa301800dbac0"],["/pokedex/static/media/7.045a2ce6.png","045a2ce6ebbc75266e28115e124b07e7"],["/pokedex/static/media/70.149b856b.png","149b856baec042bafc20a83df518cf55"],["/pokedex/static/media/71.e2f1a57d.png","e2f1a57d7a51512ea60d561624a6b4a8"],["/pokedex/static/media/72.6480abd0.png","6480abd08413b0706b0da502a200f7d6"],["/pokedex/static/media/73.171af3a0.png","171af3a083d4f705e3f5a0ec2e45089f"],["/pokedex/static/media/74.9fd502a1.png","9fd502a1a2e2995fe7aa2435c01603fe"],["/pokedex/static/media/75.3a324f3e.png","3a324f3e28e34d92a3eb4f0309bdd3ce"],["/pokedex/static/media/76.96b4e15f.png","96b4e15f7c5190da3104986cf9e99604"],["/pokedex/static/media/77.cfd6e82b.png","cfd6e82b069de26c1451326430945048"],["/pokedex/static/media/78.510ce7d8.png","510ce7d891af535049c57f19ad21715a"],["/pokedex/static/media/79.21f83434.png","21f83434edc18aabaa394a0a9bbb72df"],["/pokedex/static/media/8.ba27798e.png","ba27798eb6af19ac0ec59e0b19bf1617"],["/pokedex/static/media/80.6b5b791f.png","6b5b791f04a6197e94aaccebbd41049b"],["/pokedex/static/media/81.92bf9fe6.png","92bf9fe652bfb5f6797408e41951c914"],["/pokedex/static/media/82.ea662817.png","ea66281726fd515532949b2e95dae7b8"],["/pokedex/static/media/83.ee8309e4.png","ee8309e4007ebd256627f07b4488ec69"],["/pokedex/static/media/84.7af0ba6b.png","7af0ba6b7e26a996bfed2ff83c44e2b7"],["/pokedex/static/media/85.b101edba.png","b101edbac462202e2b414a15b2bf33a8"],["/pokedex/static/media/86.d9fe49a4.png","d9fe49a464bef81ee2aaee2316297a9d"],["/pokedex/static/media/87.37bb40c4.png","37bb40c4e5d87b90a27d72fae70e848f"],["/pokedex/static/media/88.d9417824.png","d9417824434f344bfcd57de38cd21c65"],["/pokedex/static/media/89.4f10f6e2.png","4f10f6e2ce3943f28f8399a38c70e19d"],["/pokedex/static/media/9.2c82b894.png","2c82b894b0c98af8729a6d6129546241"],["/pokedex/static/media/90.78fbe447.png","78fbe4479d0e87b16696b661f6da335c"],["/pokedex/static/media/91.1c9cdfae.png","1c9cdfae38187e9f3111f9d17409d58b"],["/pokedex/static/media/92.a6f93e5a.png","a6f93e5af037087520976be52e1fa54a"],["/pokedex/static/media/93.3af6a32e.png","3af6a32e3e13afb18818cce6e2994eec"],["/pokedex/static/media/94.d4198eef.png","d4198eef89822153cca3904ac99e1f4c"],["/pokedex/static/media/95.ce40ac60.png","ce40ac60295121eb6efea0e7f43a57ce"],["/pokedex/static/media/96.f456c2c8.png","f456c2c8a1ac2c514d0f0b96e7038dcb"],["/pokedex/static/media/97.7fa2fc41.png","7fa2fc410c2e6abf8801a29b7592db00"],["/pokedex/static/media/98.03ffa53b.png","03ffa53b1a5b3b979dabe0474571d6b5"],["/pokedex/static/media/99.43dd1e3c.png","43dd1e3cbe3d8fc182e3c8feabd1dccd"],["/pokedex/static/media/fontello.5846cdf8.svg","5846cdf8295d4bb797c46bf2c59771ce"],["/pokedex/static/media/fontello.6cf7a884.woff2","6cf7a88478f9dd0cd7aa243595bdb87d"],["/pokedex/static/media/fontello.6e21ba07.ttf","6e21ba074f686b3c694122a33721d82b"],["/pokedex/static/media/fontello.b47d376e.eot","b47d376e7f45c83c0ec1ca0c2a58f227"],["/pokedex/static/media/fontello.fe8ef3a1.woff","fe8ef3a14c4795eb1db107f7b1f2ede3"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var d=new URL(e);return"/"===d.pathname.slice(-1)&&(d.pathname+=a),d.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,d,c){var t=new URL(e);return c&&t.pathname.match(c)||(t.search+=(t.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(d)),t.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var d=new URL(a).pathname;return e.some(function(e){return d.match(e)})},stripIgnoredUrlParameters=function(e,a){var d=new URL(e);return d.hash="",d.search=d.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),d.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],d=e[1],c=new URL(a,self.location),t=createCacheKey(c,hashParamName,d,/\.\w{8}\./);return[c.toString(),t]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(d){if(!a.has(d)){var c=new Request(d,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+d+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(d,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(d){return Promise.all(d.map(function(d){if(!a.has(d.url))return e.delete(d)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,d=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(d))||(d=addDirectoryIndex(d,"index.html"),a=urlsToCacheKeys.has(d));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(d=new URL("/pokedex/index.html",self.location).toString(),a=urlsToCacheKeys.has(d)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(d)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});