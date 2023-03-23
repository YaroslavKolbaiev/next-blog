/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    firebase_apikey: "AIzaSyDxl77KqUWoe-t3dOAKli2n0MjtCnUWlts",
    firebase_authDomain: "next-blog-v3.firebaseapp.com",
    firebase_projectId: "next-blog-v3",
    firebase_storageBucket: "next-blog-v3.appspot.com",
    firebase_messagingSenderId: "1046810904491",
    firebase_appId: "1:1046810904491:web:abc3642737cda12f3af4ee",
    GRAPHQL_TOKEN:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2Nzg0Nzg2NzcsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xlemR2YjdiMHdnejAxdW0yOGpuZm12bS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiN2UyODM3NzYtZTc0YS00YWY3LTk4YTEtNmI1M2FmM2JjYjg3IiwianRpIjoiY2xmMnl2OGpnNDdkYTAxdW1jZDc2YjdyeiJ9.aKGqj3MZ7tHJFhJnd3mS4Ijg5DKYXOr9VB8n7PQgyQYtlWUN84beoCW__q9aNMnT-fIdx1Rj5Pe-c6mrHImYvmLfkMkjItlrcp6SbJFcE-CT3wpxWuvMdMMmQEeLD_d3TeUxuh-M5g3rdfu7VKWUxwccuDZ8aIiwE6vb8avcK24eYcqvSkyFv0bicSG8xiWsZD6-e2r7VAIff1OYWuD-eygHn41IdahlvpfV9W7jdWexCM3y12KOP5CL9BpRD9LPWuEATwvPFJDwXgIYQM5sfhtP0QmLIE7DGu2s_fumAXOek7EMGfBegQzQVUNHRK_RgmcqHbbiV8PdqpSusYh2ao8DNA77FbwTEa3E76E0uCKNkjxMX8wuTk8TTVm7yf9k9gqULwk609jsq1o5ixnUIdeHWLN7sGbffNK_OjZ0nd3TdIeaR3K8korA6TZmzTsCJFaEXi_vRqWlk7_9dPs4AyUKhtn22woLxH8u4rkLpPcABO_syUlGIJOLbuNubJ9QPBxEkPAKb-0Nx7APbTezPVRUCZUSUblAOd94M-S7CyGv2W91o30edVz1DInjefzSlj3xuv_1rOo8YBQFfrcYqNkfYIgHEWoE4OzQqpjrhpPEnHr6cOgckfW9q1mMLW5GSodfnKzbusGbkF_PoR25cLXmMQHpj9Ny7f4S8JwWdLs",
    GRAPHQL_ENDPOINT_READ_WRIGHT:
      "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clezdvb7b0wgz01um28jnfmvm/master",
    GRAPHQL_ENDPOINT_READ_ONLY:
      "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clezdvb7b0wgz01um28jnfmvm/master",
  },
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
