import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class AppwriteService {
    client = new Client();
    database;
    bucket;

    constructor() {
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);

        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Database Services

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                ID.unique(), 
                {title, slug, content, featuredImage, status, userId})

        } catch (error) {
            console.log("Appwrite Service Error :: createPost :: ", error);
        }
    }

    async updatePost(docId, {title, slug, content, featuredImage, status}){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                docId,
                {title, slug, content, featuredImage, status}
            )
        } catch (error) {
            console.log("Appwrite Service Error :: updatePost :: ", error);
        }
    }

    async deletePost(docId) {
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                docId
            )
        } catch (error) {
            console.log("Appwrite Service Error :: deletePost :: ", error);
        }
    }

    async getPost(docId) {
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                docId
            )
        } catch (error) {
            console.log("Appwrite Service Error :: getPost :: ", error);
        }
    }

    async getActivePosts() {
        try {
            return this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('status', 'active')
                ]
            )
        } catch (error) {
            console.log("Appwrite Service Error :: getActivePosts :: ", error);
        }
    }

    async getUserPosts(userId) {
        try {
            return this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('userId', userId)
                ]
            )            
        } catch (error) {
            console.log("Appwrite Service Error :: getUserPosts :: ", error);
        }
    }


    // File Storage(Bucket) Services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service Error :: uploadFile :: ", error);
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Service Error :: deleteFile :: ", error);
        }
    }

    getFilePreview(fileId) {
        // returns the URL of the image file
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const appwriteService = new AppwriteService();

export default appwriteService;