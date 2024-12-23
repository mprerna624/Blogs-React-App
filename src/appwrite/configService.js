import { Client, Databases, Storage, ID, Query } from "appwrite";
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

    async createBlog({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                ID.unique(), 
                {title, slug, content, featuredImage, status, userId})

        } catch (error) {
            console.log("Appwrite Service Error :: createBlog :: ", error);
        }
    }

    async updateBlog(docId, {title, slug, content, featuredImage, status}){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                docId,
                {title, slug, content, featuredImage, status}
            )
        } catch (error) {
            console.log("Appwrite Service Error :: updateBlog :: ", error);
        }
    }

    async deleteBlog(docId) {
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                docId
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service Error :: deleteBlog :: ", error);
            return false;
        }
    }

    async getBlog(docId) {
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                docId
            )
        } catch (error) {
            console.log("Appwrite Service Error :: getBlog :: ", error);
        }
    }

    async getActiveBlogs() {
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('status', 'active')
                ]
            )
        } catch (error) {
            console.log("Appwrite Service Error :: getActiveBlogs :: ", error);
        }
    }

    async getUserBlogs(userId) {
        try {
            return this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('userId', userId)
                ]
            )            
        } catch (error) {
            console.log("Appwrite Service Error :: getUserBlogs :: ", error);
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
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite Service Error :: deleteFile :: ", error);
            return false;
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